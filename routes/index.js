const equiposRouter = require('./equipos.router');
const jugadoresRouter = require('./jugadores.router');
const estadisticasRouter = require('./estadisticas.router');

function routerApi(app) {
    app.use('/equipos', equiposRouter);
    app.use('/jugadores', jugadoresRouter);
    app.use('/estadistica', estadisticasRouter);
}

module.exports = routerApi;