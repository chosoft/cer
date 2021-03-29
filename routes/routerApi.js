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
const apiChangePassword = require('./usuarios/logic/apiChangePassword')
const apiSaveUserArticle = require('./articulos/apiSaveArticle.js')
const apiGetArticle = require('./articulos/getArticles')
//Modules of Routes to user interact
const logout = require('./usuarios/logic/logout')
const router = function(server){
    //Api routes
    //OTHERS APIS FUNC
    server.use('/api/login',apiLogin)
    server.use('/api/registro',apiRegister)
    server.use('/api/retrieve',apiRetrieve)
    server.use('/api/getArticles',apiGetArticle)
    //SAVE APIS FUNC
    server.use('/api/eraserSave',apiSaveEraser)
    server.use('/api/saveUserArticle',apiSaveUserArticle)
    server.use('/api/uploadDoc',apiUpload)
    server.use('/api/saveArticle',apiSaveArticle)
    //CHANGE APIS FUNC
    server.use('/api/changeDocVisibility',apiChangeDocVisibility)
    server.use('/api/changeVisibleArticle',apiChangeVisibleArticle)
    server.use('/api/changeUserName',apiChangeUserName)
    server.use('/api/changeImgProfile',apiChangeImgProfile)
    server.use('/api/changeUserPassword',apiChangePassword)
    //DELETE APIS FUNC
    server.use('/api/deleteArticle',apiDeleteArticle)
    server.use('/api/deleteDoc',apiDeleteDoc)
    //User routes
    server.use('/users/logout',logout)
}

module.exports = router