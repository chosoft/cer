const express = require('express')
const router = express.Router()

const controller  = require('./../../../controllers/usuarios/apiChangeImg');

const errorManager = require('./../../../utils/errors/typeError')
const arrayError = []
router.post('/',(req,res)=>{
    const id = req.session.idUserLog 
    if(id === '' || id === undefined || id === null){
        res.send('notUser')
    }else{
        controller(id,req,res)
            .then(ok => res.send(ok))
            .catch(e => {
                const errorMsg = errorManager(e,arrayError)
                delete e 
                res.send(e)
            })
    }
})

module.exports = router