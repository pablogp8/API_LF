const express = require('express');
const app = express();
const port = 3000;
const dbconnector = require('./src/dbconnector');


app.get('/mujeres', async (req, res) => {
  //ret = dbconnector.query("Select * from equipo where rama= 'M'");
  console.log('Primeros')
  const pd= "Select * from equipo where rama= 'F'";
  //res.send('hola');
  const prudt= await dbconnector.query(pd).catch(err=>{
    console.error(err);
  });
  console.log(prudt);
  console.log('fin');
  res.json(prudt);
})

app.get('/hombres', async (req, res) => {
  //ret = dbconnector.query("Select * from equipo where rama= 'M'");
  console.log('Primeros')
  const pd= "Select * from equipo where rama= 'M'";
  //res.send('hola');
  const prudt= await dbconnector.query(pd).catch(err=>{
    console.error(err);
  });
  console.log(prudt);
  console.log('fin');
  res.json(prudt);
})

app.get('/equipos/lista/:id', async (req, res)=>{
  const {id}= req.params;
  console.log(id);
  const pd= "select p.bdid, p.nombre, p.apellido  from historialequipo h inner join persona p on h.persona = p.bdid where h.equipo = " + id ;
  console.log(pd);
  const prt = await dbconnector.query(pd).catch(err=>{
    console.error(err);
  });
  console.log('final');
  res.json(prt);
})

app.get('/equipos/:id', async (req, res)=>{
  const {id}= req.params;
  console.log(id);
  const pd= "Select * from equipo where bdid='" + id + "'";
  console.log(pd);
  const prt = await dbconnector.query(pd).catch(err=>{
    console.error(err);
  });
  console.log('final');
  res.json(prt);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})