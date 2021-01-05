//Modules
const express = require('express')
const router = express.Router()
//Controller
const controller = require('./../../../controllers/documentos/deleteController')
//Function to manager
const managerError = require('./../../../utils/errors/typeError')
//Config to Error handler
const arrayError = ['nullFields','notUser','null','docNotFound','nullRuta']
//Routes and his methods
router.delete('/',(req,res) => {
    if(req.session.idUserLog === undefined || req.session.idUserLog === null || req.session.idUserLog === ''){
        res.send('errorUser')
    }else{
        controller(req.session.idUserLog,req.body.deleterKey).then( ok => {
            res.send(ok)
        }).catch(e => {
            const errorLog = managerError(e,arrayError)
            delete e
            res.send(errorLog)
        })
    }

})
module.exports = router