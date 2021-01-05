//Modules
const express = require('express')
const router = express.Router()
//Controllers
const controller = require('./../../../controllers/usuarios/login')
//Functions to manager
const errorManager = require('./../../../utils/errors/typeError')
//Config to error handler
const arrayError = ['dataNull','badLogin','notUser']
router.post('/',(req,res,next) => {
    if(req.body === undefined || req.body === '' || req.body === null || Object.keys(req.body).length <= 0){
        res.send('dataNull')
    }else{
        controller(req.body,req.ip).then((datos) => {
            req.session.idUserLog = datos
            res.send('success')
        }).catch(e => {
            const errorLog = errorManager(e,arrayError)
            delete e
            res.send(errorLog)
        })
    }
})

module.exports = router