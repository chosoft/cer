//Modules
const express = require('express')
const router = express.Router()
//Controllers
const controller = require('./../../../controllers/documentos/up')
//Middleware login
const checker = require('./../../../utils/auth/userVerify')
const upload = require('./../../../config/multer')
const fileUp = upload.array('myFiles',15)
//Functions to Manager
const errorManager = require('./../../../utils/errors/typeError')
//Config to error handler
const arrayError = ['errorUp','notUser','null','errorUpload']
//Routes and his methods
router.post('/',checker,fileUp,async (req,res) => {
    try {
        const id = req.session.idUserLog
        const ip = req.ip
        const files = req.files ? req.files : 'nulos'
        const group = (req.header('svType') === 'blog') ? 'articulos' : 'documentos'
        const controllerUploadResponse = await controller(id,ip,files,group)
        res.send(controllerUploadResponse)
    } catch (e) {
        const erroMsg = errorManager(e,arrayError)
        delete e
        res.send(erroMsg)
    }
})



module.exports = router