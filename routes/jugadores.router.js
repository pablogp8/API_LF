const express = require('express');
const dbconnector = require('../src/dbconnector');
const router = express.Router();

router.get('/lista/:id', async (req, res)=>{
    const {id}= req.params;    
    const pd= "select p.bdid, p.nombre, p.apellido  from historialequipo h inner join persona p on h.persona = p.bdid where h.equipo = " + id ;    const prt = await dbconnector.query(pd).catch(err=>{
      console.error(err);
    });    
    res.json(prt);
  })

  router.get('/:id', async (req, res)=>{
    const {id}= req.params;    
    const pd= "select *  from persona p where p.bdid = " + id ;    const prt = await dbconnector.query(pd).catch(err=>{
      console.error(err);
    });    
    res.json(prt);
  })
module.exports = router;