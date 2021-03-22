const express = require('express')

const router = express.Router()

const controller = require('./../../controllers/articulos/controller')

const checker = require('./../../utils/auth/userVerify')

const managerError = require('./../../utils/errors/typeError')
const arrayError = ['notUser','notObj','dataNull']
router.post('/', checker,async (req, res) => {
    try {
        const id = req.session.idUserLog
        const controllerResponse = await controller(id,req.body)
        res.send(controllerResponse)
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.send(errorLog)
    }
    /* if(req.session.idUserLog === undefined || req.session.idUserLog === '' || req.session.idUserLog === null){
        res.send('notUser')
    }else{
        const idUser = req.session.idUserLog
        controller(idUser,req.body)
            .then(response => {
                res.send(response)
            })
            .catch(e => {
                console.log(e)
                const errorMessage = errorLog(e,arrayError)
                delete e
                res.send(errorMessage)
            })
    } */
})

module.exports = router