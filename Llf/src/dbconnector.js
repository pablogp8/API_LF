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
        var conn = await this.dbconnector.getConnection();
        var ret = {};
        conn.query(param).then(data=>{
            ret = data[0];
            console.log(data);
            conn.end();
        })
        .catch(err =>{
            console.error(err);
            conn.end();
        })
        return ret;
    }
}

module.exports = new DBConnector();