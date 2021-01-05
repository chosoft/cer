//Modules
const express = require('express')
const router = express.Router()
//Controllers
const controller = require('./../../../controllers/usuarios/register')
//Functions to manager
const errorManager = require('./../../../utils/errors/typeError')
//Config to error handler
const arrayError = ['nulos','badCheck','registerYet']
//Router and his methods
router.post('/',(req,res,next) => {
    if(Object.keys(req.body).length <= 0 || req.body === undefined || req.body === ''){
        res.send('nulos')
    }else{
        controller(req.body).then((ok) => {
            res.send(ok)
        }).catch(e => {
            const errorLog = errorManager(e,arrayError)
            delete e
            res.send(errorLog)
        })
    }
})

module.exports = router