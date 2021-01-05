//Modules
const express = require('express')
const router = express.Router()
//Controllers 
const dashController = require('../../controllers/dash/dash')
//Functions to manager
const managerError = require('./../../utils/errors/typeError')
//Config to error handler
const arrayError = ['idNull','notUser','null','notArticles']

//Routes and his methods
router.get('/',(req,res,next) => {
    if(req.session.idUserLog === undefined){
        res.redirect('/loguearse')
    }else{
        dashController(req.session.idUserLog).then(datos => {

            if(datos[1] === [] || Object.entries(datos[1]).length <= 0){
                res.render('dash',{perfilData: datos[0],arts: 'nulos',title: 'Panel - Blog'})
            }else{
                res.render('dash',{perfilData: datos[0],arts: datos[1],title: 'Panel - Blog'})
            }
        }).catch(e => {
            const errorLog = managerError(e,arrayError)
            delete e
            res.redirect('/loguearse')
        })
    }
})

module.exports = router