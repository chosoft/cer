const express = require('express')
const router = express.Router()

const controller = require('./../../controllers/articulos/changeVisibility')

const checker = require('./../../utils/auth/userVerify')

const managerError = require('./../../utils/errors/typeError')
const arrayError = ['notUser','notKey','notVisibility']

router.put('/',checker,async (req, res) => {
    try {
        const id = req.body.id ? req.body.id : 'nulo'
        const visibility = req.body.visibility ? req.body.visibility : false
        const controllerResponse = await controller(id,visibility)
        res.send(controllerResponse)
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.send(errorLog)
    }
/*     if(req.session.idUserLog === undefined || req.session.idUserLog === null || req.session.idUserLog === ''){
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
    } */
})
module.exports = router