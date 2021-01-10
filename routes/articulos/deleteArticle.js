const express = require('express') 
const router = express.Router()

const controller = require('./../../controllers/articulos/controllerDelete')

const errorManager = require('./../../utils/errors/typeError')
const arrayError = ['notKey','notUser']

router.delete('/',(req,res) => {
    if(req.session.idUserLog === undefined || req.session.idUserLog === null || req.session.idUserLog === ''){
        res.send('notUser')
    }else{
        controller(req.session.idUserLog,req.body)
            .then(ok=> {
                res.send(ok)
            })
            .catch(e => {
                console.log(e)
                const errorMsg = errorManager(e,arrayError)
                delete e
                res.send(errorMsg)
            })
    }
})

module.exports = router