const express = require('express')
const router = express.Router()

const controller = require('./../../controllers/articulos/viewController')
const checker = require('./../../utils/auth/userVerify')

const managerError = require('./../../utils/errors/typeError')
const arrayError = []
router.get('/',checker, async (req,res) => {
    try{
        const id = req.session.idUserLog
        const controllerResponse = await controller(id,true)
        res.render('articulos',controllerResponse)
    }catch(e){
        const errorLog = managerError(e,arrayError)
        console.error(e)
        delete e
        res.send(errorLog)        
    }
    
    
})

router.post('/',checker, async (req,res) => {
    try {
        const id = req.session.idUserLog
        const controllerResponse = await controller(id,false)
        res.send(controllerResponse)
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e
        res.send(errorLog)
    }
})
module.exports = router 

