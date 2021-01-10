const express = require('express')
const router = express.Router()

const controller = require('./../../../controllers/documentos/changeVisibility')

const errorManager = require('./../../../utils/errors/typeError')
const arrayError = ['notUser','notKey','notVisibility']

router.put('/',(req,res) => {
    if(req.session.idUserLog === undefined || req.session.idUserLog === null || req.session.idUserLog === ''){
        res.send('notUser')
    }else{
        const id = req.session.idUserLog
        const { keyChanger,visible } = req.body
        console.log(req.body)
        controller(id,keyChanger,visible)
            .then(ok => res.send(ok))
            .catch(e => {
                const errorMessage = errorManager(e,arrayError)
                delete e 
                res.send(errorMessage)
            })
    }   
})

module.exports = router