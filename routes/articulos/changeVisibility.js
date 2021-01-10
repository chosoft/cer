const express = require('express')
const router = express.Router()

const controller = require('./../../controllers/articulos/changeVisibility')

const errorManager = require('./../../utils/errors/typeError')
const arrayError = ['notUser','notKey','notVisibility']

router.put('/', (req, res) => {
    if(req.session.idUserLog === undefined || req.session.idUserLog === null || req.session.idUserLog === ''){
        res.send('notUser')
    }else{
        if(Object.keys(req.body).length <= 0){
            res.send('notObj')
        }else{
            const idUser = req.session.idUserLog
            const { id,visible } = req.body
            controller(idUser,id,visible)
                .then(ok => {
                    res.send(ok)
                })
                .catch(e => {
                    console.log(e)
                    const errorMessage = errorManager(e,arrayError)
                    delete e 
                    res.send(errorMessage)
                })
        }
    }
})
module.exports = router