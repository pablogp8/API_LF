const express = require('express');
const dbconnector = require('../src/dbconnector');
const router = express.Router();

router.get('/tabla', async (req, res)=>{
    const pd = `SELECT 
	e.bdid  as bdid,
    e.nombre AS nombre,
    e.imagen as image,
    COALESCE(SUM(
        CASE 
            WHEN j.equipocasa = e.bdid THEN j.marcadorequipocasa
            WHEN j.equipovisita = e.bdid THEN j.marcadorequipovisita
            ELSE 0
        END), 0) AS pointsf,
    COALESCE(SUM(
        CASE 
            WHEN j.equipocasa = e.bdid THEN j.marcadorequipovisita
            WHEN j.equipovisita = e.bdid THEN j.marcadorequipocasa
            ELSE 0
        END), 0) AS pointsc,
    SUM(
        CASE 
            WHEN j.equipoganador = e.bdid THEN 1
            ELSE 0
        END) AS wins,
    SUM(
        CASE 
            WHEN (j.equipocasa = e.bdid AND j.marcadorequipocasa < j.marcadorequipovisita)
                 OR (j.equipovisita = e.bdid AND j.marcadorequipovisita < j.marcadorequipocasa) THEN 1
            ELSE 0
        END) AS losses,
    SUM(
        CASE 
            WHEN J.equipodef = E.bdid THEN 1
            ELSE 0
        END) AS lossesdef,
    COALESCE(SUM(
        CASE 
            WHEN j.equipocasa = e.bdid THEN j.marcadorequipocasa - j.marcadorequipovisita
            WHEN j.equipovisita = e.bdid THEN j.marcadorequipovisita - j.marcadorequipocasa
            ELSE 0
        END), 0) AS difference,
    COALESCE(SUM(
        CASE 
            WHEN j.equipoganador = e.bdid THEN 2
            when J.equipodef = E.bdid THEN 0
            ELSE 1
        END), 0) AS points
FROM 
    equipo e
LEFT JOIN 
    juego j ON e.bdid = j.equipocasa OR e.bdid = j.equipovisita
where e.rama = 'M'
GROUP BY 
    e.bdid
ORDER BY 
    points DESC`;
    const prudt = await dbconnector.query(pd).catch(err=>{
        console.error(err);
    });
    const juegos = await dbconnector.query('select j.bdid, j.equipocasa as casa, j.equipovisita as visita, j.equipoganador as ganador from juego j').catch(err=>{
        console.error(err);
    });
    let np = juegos.find(({casa, visita})=> casa=== 112 && visita ===103);
    if (np === undefined){        
        np = juegos.find(({casa, visita})=> casa=== 103 && visita ===112);
    }
    console.log(np);
    for ( var i=0; i<prudt.length; i++){
        prudt[i].games = parseInt(prudt[i].wins, 10)+ parseInt(prudt[i].losses, 10)+ parseInt(prudt[i].lossesdef, 10)
    }
    //console.log(prudt);
    res.json(prudt);
})

module.exports = router;