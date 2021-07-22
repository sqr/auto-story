const express = require('express');
const multer  = require('multer');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');
const { Pool, Client } = require('pg')

const app = express();
dotenv.config();

app.use(express.static('public'));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// const upload = multer({dest: 'public/images'})
var upload = multer({storage: storage})

app.use(express.json());
// middleware to handle post request
app.use(express.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  console.log('listening');
  res.send('listening');
}) 

app.post('/send_job', upload.single('upload'), (req, res) => {
  const texto = req.body.texto;
  const fileLocation = `http://${process.env.WSL2_IP}:3000/images/`
  const query = 
    {
      "template":{
          "src":"https://www.dropbox.com/s/tgrde2h7gqhs0tb/template.aep?dl=1",
          "composition":"main"
          },
          "assets": [
              {
              //"src": "file:///D:/Bracero Dropbox/Arturo Bracero/dev/instagram-story-creator/template/B.png",
              "src": fileLocation + req.file.filename,
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