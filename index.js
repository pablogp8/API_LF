const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();
const dbconnector = require('./src/dbconnector');
const routerApi = require('./routes');

app.use(express.json());
const whitelist = ['http://localhost:4200','http://127.0.0.1:4200','http://192.168.0.201:4200', 'localhost:4200'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)|| !origin){
      callback(null, true);
    } else{
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
routerApi(app);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})