const express = require('express');
const dbconnector = require('../src/dbconnector');
const router = express.Router();

    router.get('/masculino', async (req, res) => {
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

  router.get('/femenino', async (req, res) => {
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

  router.get('/:id', async (req, res)=>{
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
  
  module.exports = router;