//Modules
const express = require('express')
const router = express.Router()
//Controllers
const controller = require('./../../../controllers/documentos/up')
//Functions to Manager
const errorManager = require('./../../../utils/errors/typeError')
//Config to error handler
const arrayError = ['errorUp','notUser','null','errorUpload']
//Routes and his methods
router.post('/',(req,res) => {
    if(req.session.idUserLog === undefined || req.session.idUserLog === null || req.session.idUserLog === ''){
        res.send('notUser')
    }else{
        controller(req.session.idUserLog,req.ip,req,res)
            .then(ok => {
                res.send(ok)
            })
            .catch(e => {
                const erroMsg = errorManager(e,arrayError)
                delete e
                res.send(erroMsg)
            })
    }

   
})



module.exports = router