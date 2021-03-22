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
        const controllerResponse = await controller(id,mode)
        if(controllerResponse === 'nulos'){
            res.send('nulos')
        }else{
            res.send(controllerResponse.reverse())
        }
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.send(errorLog)
    }

    /* if(req.session.idUserLog === undefined || req.session.idUserLog === null || req.session.idUserLog === '') { 
        res.send('notUser')
    }else{
        const type = (req.params.type === 'image' || req.params.type === 'video') ? req.params.type : 'image'    
        if(type === 'video'){
            controller(req.session.idUserLog,'vid')
                .then((docs) => {
                    if(docs === 'nulos'){
                        res.send(docs)
                    }else{
                        res.send(docs.reverse())
                    }
                })  
                .catch(err => {
                    const errorLog = managerError(err,arrayError)
                    delete err
                    res.send(errorLog)
                })
        }else{
            controller(req.session.idUserLog,type)
            .then((docs) => {
                if(docs === 'nulos'){
                    res.send(docs)
                }else{
                    res.send(docs.reverse())
                }
            })  
            .catch(err => {
                const errorLog = managerError(err,arrayError)
                delete err
                res.send(errorLog)
            })
        }
    } */
})

module.exports = router