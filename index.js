const express = require('express')
const app = express()
const port = 3000
const dbconnector = require('./src/dbconnector');


app.get('/', (req, res) => {
  //ret = dbconnector.query("Select * from equipo where rama= 'M'");
  console.log('Primeros')
  console.log(dbconnector.query("Select * from equipo where rama= 'F'"));
  res.send('hola');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})