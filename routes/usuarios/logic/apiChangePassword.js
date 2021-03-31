const express = require('express')
const router = express.Router()

const checker = require('./../../../utils/auth/userVerify')

const controller = require('./../../../controllers/usuarios/apiChangePassword')
const managerError = require('./../../../utils/errors/typeError')
const arrayError = []
router.post('/',checker, async(req,res) =>{
    try {
        const id = req.session.idUserLog
        const controllerResponse = await controller(id,req.body)
        res.send(controllerResponse)
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e
        res.send(errorLog)        
    }
})

module.exports = router