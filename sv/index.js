// const express = require('express');
// const app = express();
const dotenv = require('dotenv');
dotenv.config();

// app.get('/', (req, res) => {
//   console.log('listening');
//   res.send('listening');
// }) 

// const server = app.listen(process.env.PORT, () => {
//   const host = server.address().address
//   const port = server.address().port

//   console.log("Listening on %s port %s", host, port)
// });

const { createClient } = require('@nexrender/api')

const client = createClient({
    host: process.env.NEXRENDER_SERVER,
    secret: process.env.NEXRENDER_SECRET,
    polling: 1000,
})

const main = async () => {
    const result = await client.addJob({
        template: {
            src: process.env.TEST_PROJECT,
            composition: 'main',
        }
    })

    result.on('created', job => console.log('project has been created'))
    result.on('started', job => console.log('project rendering started'))
    result.on('progress', (job, percents) => console.log('project is at: ' + percents + '%'))
    result.on('finished', job => console.log('project rendering finished'))
    result.on('error', err => console.log('project rendering error', err))
}

main().catch(console.error);