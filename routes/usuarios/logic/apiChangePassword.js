const express = require('express')
const router = express.Router()

const controller = require('./../../../controllers/usuarios/apiChangePassword')
router.post('/', async(req,res) =>{
    try {
        const id = req.session.idUserLog
        if(id === null || id === undefined || id === ''){
            res.send('notUser')
        }else{
            const controllerResponse = await controller(id,req.body)
            res.send(controllerResponse)
        }
    } catch (e) {
        res.send(e)        
    }
})

module.exports = router