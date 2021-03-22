const express = require('express')

const router = express.Router()

const controller = require('./../../controllers/articulos/saveController.js')

const checker = require('./../../utils/auth/userVerify')

const managerError = require('./../../utils/errors/typeError')
const arrayError = ['dataNull','objNull']

router.post('/',checker,async (req, res) => {
    try {
        const id = req.session.idUserLog
        const ip = req.ip
        const controllerSaveResponse = await controller(id,req.body,ip)
        res.send(controllerSaveResponse)
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.send(errorLog)
    }
})

module.exports = router