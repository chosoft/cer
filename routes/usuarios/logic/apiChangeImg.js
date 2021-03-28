const express = require('express')
const router = express.Router()

const controller  = require('./../../../controllers/usuarios/apiChangeImg');
const checker = require('./../../../utils/auth/userVerify')

const upload = require('./../../../config/imgMulter')
const imgUpload = upload.single('myFiles')

const managerError = require('./../../../utils/errors/typeError')
const arrayError = []

router.post('/',checker,imgUpload,async (req,res)=>{
    try {
        const id = req.session.idUserLog
        const file = req.file ? req.file : 'nulo'
        const controllerResponse = await controller(id,file)

        res.send(controllerResponse)
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.send(e)
    }
/*     const id = req.session.idUserLog 
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
    } */
})

module.exports = router