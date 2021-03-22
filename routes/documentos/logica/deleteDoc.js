//Modules
const express = require('express')
const router = express.Router()
//Controller
const controller = require('./../../../controllers/documentos/deleteController')
//Middleware
const checker = require('./../../../utils/auth/userVerify')
//Function to manager
const managerError = require('./../../../utils/errors/typeError')
//Config to Error handler
const arrayError = ['nullFields','notUser','null','docNotFound','nullRuta']
//Routes and his methods
router.delete('/',checker,async (req,res) => {
    try{
        const deleterKey = req.body.deleterKey ? req.body.deleterKey : 'nulo'
        const controllerDeleteResponse = await controller(deleterKey)
        res.send(controllerDeleteResponse)
    }catch(e){
        const errorLog = managerError(e,arrayError)
        delete e
        res.send(errorLog)
    }
})
module.exports = router