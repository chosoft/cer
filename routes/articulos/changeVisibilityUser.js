const express = require('express')
const router = express.Router()

const controller = require('./../../controllers/articulos/changeVisibilityUser')

const checker = require('./../../utils/auth/userVerify')

const managerError = require('./../../utils/errors/typeError')
const arrayError = ['notUser','notKey','notVisibility']

router.put('/',checker,async (req, res) => {
    try {
        const id = req.body.id ? req.body.id : 'nulo'
        const visibility = req.body.visibility ? req.body.visibility : false
        const controllerResponse = await controller(id,visibility)
        res.send(controllerResponse)
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.send(errorLog)
    }
})
module.exports = router