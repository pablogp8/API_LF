const mariadb = require('mariadb');

const config = {
    host: '192.168.0.201',
    user: 'root',
    password: 'Conect12',
    database: 'ligaflores',
    connectionLimit: 5,
    acquireTimeout: 300
}

class DBConnector{
    dbconnector = mariadb.createPool(config);

    async query(param) {
        var conn = (await this.dbconnector.getConnection()).query(param);
        //this.dbconnector.end();                 
       /* conn.query(param).then(data=>{
            ret = data;
            console.log(data);
            conn.end();      
            return ret      
        })
        .catch(err =>{
            console.error(err);
            conn.end();     
            return ret       
        })*/
        return conn;
    }

    find(param) {
        return new Promise((resolve, reject) => {
            setTimeout(() =>{
                console.log('inicio conteo');
               const nm=this.query(param)
                resolve(nm);
            }, 3000);
        })
    }
}

module.exports = new DBConnector();