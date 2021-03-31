const express = require('express')
const router = express.Router()

const controller = require('./../../../controllers/usuarios/apiChangeUserName')

const checker = require('./../../../utils/auth/userVerify')

const managerError = require('./../../../utils/errors/typeError')
const arrayError = []

router.post('/',checker,async (req,res) => {
    try {
        const id = req.session.idUserLog
        if(Object.keys(req.body).length <= 0){
            res.send('userNameNull')
        }else{
            const controllerResponse = await controller(id,req.body.username)
            res.send(controllerResponse)
        }
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.send(errorLog)
    }
/*     const id = req.session.idUserLog
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
    } */
})

module.exports = router