const express = require('express');
const router = express.Router()

const checker = require('./../../utils/auth/userVerify')

const controller = require('./../../controllers/perfil/controller')


router.get('/',checker,async (req,res) => {
    try {
        const id = req.session.idUserLog
        const controllerPerfilResponse = await controller(id)
        res.render('perfil',{...controllerPerfilResponse,id,title:'Perfil'})
    } catch (e) {
        delete e
        res.redirect('/loguearse')
    }
})

module.exports = router 