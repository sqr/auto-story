const express = require('express');
const multer  = require('multer')
const path = require('path');
const dotenv = require('dotenv');

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
  const query = 
    {
      "template":{
          "src":"https://www.dropbox.com/s/tgrde2h7gqhs0tb/template.aep?dl=1",
          "composition":"main"
          },
          "assets": [
              {
              "src": "file:///D:/Bracero Dropbox/Arturo Bracero/dev/instagram-story-creator/template/B.png",
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

  console.log(req.body)
  res.send(query);    // echo the result back
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