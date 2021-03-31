//Modules
const express = require('express')
const router = express.Router()
//Controllers
const controller = require('./../../../controllers/documentos/retrieveController')
//Middleware
const checker = require('./../../../utils/auth/userVerify')
//Functions to manager
const managerError = require('./../../../utils/errors/typeError')
//Config to error handler
const arrayError = ['notUser','null']
//Routes and his methods

router.post('/:type',checker,async (req,res) => {
    try {
        const type = (req.params.type === 'image' || req.params.type === 'video') ? req.params.type : 'image'
        const mode = (type === 'video') ? 'vid' : type
        const controllerResponse = await controller(mode,id)
        if(controllerResponse === 'nulos'){
            res.send('nulos')
        }else{
            controllerResponse.sort((a,b)=>{
                return new Date(b.date) - new Date(a.date)
            })
            res.send(controllerResponse)
        }
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.send(errorLog)
    }

})

module.exports = router