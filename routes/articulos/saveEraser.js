const express = require('express')

const router = express.Router()

const controller = require('./../../controllers/articulos/controller')

const errorLog = require('./../../utils/errors/typeError')
const arrayError = ['notUser','notObj','dataNull']
router.post('/', (req, res) => {
    if(req.session.idUserLog === undefined || req.session.idUserLog === '' || req.session.idUserLog === null){
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
    }
})

module.exports = router