const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.get('/', (req, res) => {
  console.log('listening');
  res.send('listening');
}) 

const server = app.listen(process.env.PORT, () => {
  const host = server.address().address
  const port = server.address().port

  console.log("Listening on %s port %s", host, port)
});