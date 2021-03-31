const express = require('express') 
const router = express.Router()

const controller = require('./../../controllers/articulos/controllerDeleteUser')

const checker = require('./../../utils/auth/userVerify')

const managerError = require('./../../utils/errors/typeError')
const arrayError = ['notKey','notUser']

router.delete('/',checker,async(req,res) => {
    try {
        const controllerResponse = await controller(req.body)
        res.send(controllerResponse)
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.send(errorLog)
    }
})

module.exports = router