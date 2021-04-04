//Modules of Routes of view
const indexRouter = require('./index/index')
const loginRouter = require('./usuarios/loguearse')
const registrarseRouter = require('./usuarios/registrarse')
const dashRouter = require('./usuarios/dash')
const docsRouter = require('./documentos/documentos')
const perfilRouter = require('./perfil/perfil')
const articulosRouter = require('./articulos/articulosPersonal')
const articulosCerRouter = require('./frontend/articulos')
const blogRouter = require('./frontend/blog')
const maestrosRouter = require('./frontend/maestros')
const maestroRouter = require('./frontend/maestro')
//const testRouter = require('./test/testing')
//Modules of 404 Routes
const { notFound } = require('./../utils/errors/managers')
//Router function
const router = function(server){
    //View Route
    server.use('/',indexRouter)
    server.use('/loguearse',loginRouter)
    server.use('/articuloscer',articulosCerRouter)
    server.use('/private/c/registro',registrarseRouter)
    server.use('/dash',dashRouter)
    server.use('/documentos',docsRouter)
    server.use('/perfil',perfilRouter)
    server.use('/articulos', articulosRouter)
    server.use('/blog', blogRouter)
    server.use('/maestros', maestrosRouter)
    server.use('/maestro', maestroRouter)

    //server.use('/testing',testRouter)
    //404 route
    server.use(notFound)
}

module.exports = router