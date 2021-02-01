const express = require('express')
const router = express.Router()

const controller = require('./../../../controllers/usuarios/apiChangeUserName')

const errorManager = require('./../../../utils/errors/typeError')
const arraError = []

router.post('/',(req,res) => {
    const id = req.session.idUserLog
    if(id === '' || id === null || id === undefined){
        res.send('notUser')
    }else{  
        if(Object.keys(req.body).length <= 0){
            res.send('notBody')
        }else{
            const { username } = req.body
            controller(id,username)
                .then((ok => {
                    res.send(ok)
                }))
                .catch(e => {
                    const errorMsg = errorManager(e,arrayError)
                    delete e 
                    res.send(errorMsg)
                })
        }
    }
})

module.exports = router