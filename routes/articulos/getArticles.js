const express = require('express') 
const router = express.Router()

const controller = require('./../../controllers/articulos/getArticles')

const checker = require('./../../utils/auth/userVerify')

const managerError = require('./../../utils/errors/typeError')
const arrayError = []

router.post('/',checker,async (req, res) => {
    try {
        const id = req.session.idUserLog
        const controllerResponse = await controller(id)
        res.send([...controllerResponse,id])
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.send(errorLog)
    }
})

module.exports = router