const express = require('express')

const router = express.Router()

const controller = require('./../../controllers/articulos/saveController.js')

const errorLog = require('./../../utils/errors/typeError')
const arrayError = ['dataNull','objNull']

router.post('/', (req, res) => {
    if(req.session.idUserLog === undefined || req.session.idUser === null || req.session.idUserLog === ''){
        res.send('notUser')
    }else{
        controller(req.session.idUserLog,req.body,req.ip)
            .then(ok => {
                res.send(ok)
            })
            .catch(e => {
                console.log(e)
                const erroMsg = errorLog(e,arrayError)
                delete e
                res.send(erroMsg)
            })
    }
})

module.exports = router