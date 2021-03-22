const express = require('express')
const router = express.Router()

const controller = require('./../../../controllers/documentos/changeVisibility')

const checker = require('./../../../utils/auth/userVerify')

const errorManager = require('./../../../utils/errors/typeError')
const arrayError = ['notUser','notKey','notVisibility']

router.put('/',checker,async(req,res) => {
    try {
        const id = req.session.idUserLog        
        const keyChanger = req.body.keyChanger ? req.body.keyChanger : 'nulo'
        const visible = req.body.visible ? req.body.visible : false
        const controllerResponse = await controller(id,keyChanger,visible)
        res.send(controllerResponse)
    } catch (e) {
        const errorLog = errorManager(e,arrayError)
        delete e 
        res.send(errorLog)
    }
})

module.exports = router