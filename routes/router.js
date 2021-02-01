//Modules of Routes of view
const indexRouter = require('./index/index')
const loginRouter = require('./usuarios/loguearse')
const registrarseRouter = require('./usuarios/registrarse')
const dashRouter = require('./usuarios/dash')
const docsRouter = require('./documentos/documentos')
const perfilRouter = require('./perfil/perfil')
//Modules of Routes of API
const apiRegister = require('./usuarios/logic/apiRegister')
const apiLogin = require('./usuarios/logic/apiLoguearse')
const apiUpload = require('./../routes/documentos/logica/apiUpload')
const apiDeleteDoc = require('./../routes/documentos/logica/deleteDoc')
const apiChangeDocVisibility = require('./documentos/logica/changeVisibility')
const apiRetrieve = require('./documentos/logica/apiRetrieve')
const apiSaveEraser = require('./articulos/saveEraser')
const apiSaveArticle = require('./articulos/saveArticle')
const apiDeleteArticle = require('./articulos/deleteArticle')
const apiChangeVisibleArticle = require('./articulos/changeVisibility')
const apiChangeUserName = require('./usuarios/logic/apiChangeUserName')
const apiChangeImgProfile = require('./usuarios/logic/apiChangeImg')

//Modules of Routes to user interact
const logout = require('./usuarios/logic/logout')
//Modules of 404 Routes
const {notFound} = require('./../utils/errors/managers')
//Router function
const router = function(server){
    //View Route
    server.use('/',indexRouter)
    server.use('/loguearse',loginRouter)
    server.use('/private/c/registro',registrarseRouter)
    server.use('/dash',dashRouter)
    server.use('/documentos',docsRouter)
    server.use('/perfil',perfilRouter)

    //Api routes
    server.use('/api/uploadDoc',apiUpload)
    server.use('/api/deleteDoc',apiDeleteDoc)
    server.use('/api/changeDocVisibility',apiChangeDocVisibility)
    server.use('/api/registro',apiRegister)
    server.use('/api/login',apiLogin)
    server.use('/api/retrieve',apiRetrieve)
    server.use('/api/eraserSave',apiSaveEraser)
    server.use('/api/saveArticle',apiSaveArticle)
    server.use('/api/deleteArticle',apiDeleteArticle)
    server.use('/api/changeVisibleArticle',apiChangeVisibleArticle)
    server.use('/api/changeUserName',apiChangeUserName)
    server.use('/api/changeImgProfile',apiChangeImgProfile)


    //User routes
    server.use('/users/logout',logout)

    //404 route
    server.use(notFound)
}

module.exports = router