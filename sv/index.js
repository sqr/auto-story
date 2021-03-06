const express = require('express');
const multer  = require('multer');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./db');
const cors = require('cors');
const { fstat } = require('fs');
const fs = require('fs')
const app = express();
dotenv.config();

app.use(express.static('public'));

app.use(cors());


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({storage: storage})

app.use(express.json({limit: '50mb'}));
// middleware to handle post request
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}))

app.get('/', (req, res) => {
  console.log('listening');
  res.send('listening');
}) 

app.get('/user/:username', async (req, res) => {
  const results = await db.query("select * from users where username = $1", [req.params.username])
  console.log(req.params.username)
  console.log(results.rows[0])
  res.send(results.rows[0])
})


app.get('/db_jobs', async (req, res) => {
  const results = await db.query("select * from jobs")
  res.send(results.rows)
})

app.get('/nexrender_jobs', (req, res) => {
  let config = {
    headers: {
      'nexrender-secret': 'peine',
    }
  }
  axios
  .get('http://localhost:3050/api/v1/jobs', config)
  .then(response  => {
    console.log(response.data)
    res.send(response.data)
  })
  .catch(error => {
    console.error(error)
  })
})

app.get('/jobs_processed', async (req,res) => {
  const db_jobs = await db.query("select a.id, a.job_id, a.user_id, b.username user_id from jobs a join users b on a.user_id = b.user_id")
  let config = {
    headers: {
      'nexrender-secret': 'peine',
    }
  }
  const nexrender_jobs = await axios.get('http://localhost:3050/api/v1/jobs', config)
    var result = []
    var temp_db = []
    for (let i = 0; i < db_jobs.rows.length; i++) {
      temp_db.push(db_jobs.rows[i].job_id)
      temp_db.push(db_jobs.rows[i].user_id)      
    }
    
    for (let i = 0; i < nexrender_jobs.data.length; i++) {

      let temp = nexrender_jobs.data[i]

      if (temp_db.indexOf(nexrender_jobs.data[i].uid) === -1) {
        temp['created_by'] = 'No username'
        result.push(temp)
      } else {
        let username_position = temp_db.indexOf(nexrender_jobs.data[i].uid)
        let username = temp_db[username_position+1]
        temp['created_by'] = username
        result.push(temp)
      }
    }
  res.send(result)
})

app.post('/upload_image', (req, res) => {  
  console.log(req.file)
  var img = req.body.upload
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = Buffer.from(data, 'base64');
  fs.writeFile('public/images/image.png', buf, (err) => { 
    if (err) { 
      console.log(err); 
    }
  });
  res.send('ok');
})

app.post('/send_job', upload.single('upload'), (req, res) => {
  const texto = `'${req.body.texto}'`;
  const fileLocation = `http://${process.env.WSL2_IP}:3000/images/`
  const query = 
    {
      "template":{
          "src":"https://www.dropbox.com/s/tgrde2h7gqhs0tb/template.aep?dl=1",
          "composition":"main"
          },
          "assets": [
              {
              "src": "file:///D:/Bracero Dropbox/Arturo Bracero/dev/instagram-story-creator/template/B.png",
              //"src": fileLocation + req.file.filename,
              "type": "image",
              "layerName": "arriba"
              },
              {
              "src": "file:///D:/Bracero Dropbox/Arturo Bracero/dev/instagram-story-creator/template/A.png",
              "type": "image",
              "layerName": "abajo"
              },
              {
              "type": "data",
              "layerName": "texto",
              "property": "Source Text",
              "expression": texto
              }
          ],
          "actions": {
              "postrender": [
                  {
                      "module": "@nexrender/action-encode",
                      "output": "output.mp4",
                      "preset": "mp4"
                  }
              ]
          }
  };
  let config = {
    headers: {
      'nexrender-secret': 'peine',
    }
  }
  axios
    .post('http://localhost:3050/api/v1/jobs', query, config)
    .then(res  => {
      console.log(res)
      db.query("INSERT INTO jobs(job_id, user_id, started, processing, completed, error)VALUES($1, 1, false, false, false, false) ", [res.data.uid])
      .then(res => {
        console.log('res 2: ' + res)
      })
      .catch(error => {
        console.error(error)
      })
    })
    .catch(error => {
      console.error(error)
    })

  console.log(req.body)
  console.log(upload)
  res.send(query);    // echo the result back
})

app.get('/jobs', (req, res) => {
  console.log('jobs listing');
  let config = {
    headers: {
      'nexrender-secret': 'peine',
    }
  }
  var htmlRes = "Lista de trabajos:\n"

  axios
    .get('http://localhost:3050/api/v1/jobs', config)
    .then(response  => {
      console.log(response)
      for (i = 0; i < response.data.length; i++) {
        console.log(response.data[i].uid)
        uidInfo = response.data[i].uid
        state = response.data[i].state
        htmlRes = htmlRes + `<li>${uidInfo} - State: ${state}</li>`
      }
      res.send(htmlRes)
    })
    .catch(error => {
      console.error(error)
    })
}) 

const server = app.listen(process.env.PORT, () => {
  const host = server.address().address
  const port = server.address().port

  console.log("Listening on %s port %s", host, port)
});

// const { createClient } = require('@nexrender/api')

// const client = createClient({
//     host: process.env.NEXRENDER_SERVER,
//     secret: process.env.NEXRENDER_SECRET,
//     polling: 1000,
// })

// const main = async () => {
//     const result = await client.addJob({
//         template: {
//             src: process.env.TEST_PROJECT,
//             composition: 'main',
//         }
//     })

//     result.on('created', job => console.log('project has been created'))
//     result.on('started', job => console.log('project rendering started'))
//     result.on('progress', (job, percents) => console.log('project is at: ' + percents + '%'))
//     result.on('finished', job => console.log('project rendering finished'))
//     result.on('error', err => console.log('project rendering error', err))
// }

// main().catch(console.error);