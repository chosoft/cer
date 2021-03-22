const express = require('express') 
const router = express.Router()

const controller = require('./../../controllers/articulos/controllerDelete')

const checker = require('./../../utils/auth/userVerify')

const managerError = require('./../../utils/errors/typeError')
const arrayError = ['notKey','notUser']

router.delete('/',checker,async(req,res) => {
    try {
        const controllerResponse = await controller(req.body)
        res.send(controllerResponse)
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.send(errorLog)
    }
/*     if(req.session.idUserLog === undefined || req.session.idUserLog === null || req.session.idUserLog === ''){
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
    } */
})

module.exports = router