const express = require('express');
const router = express.Router()

const controller = require('./../../controllers/perfil/controller')

const errorManager = require('./../../utils/errors/typeError')
const arrayError = []

router.get('/',(req,res) => {
    const idSession = req.session.idUserLog
    if(idSession === '' || idSession === undefined || idSession === null) {
        res.redirect('/loguearse')
    }else{
        controller(idSession)
            .then(ok => res.render('perfil',{perfilData: ok[0],dataVariable: ok[1], id: idSession}))
            .catch(e => {
                console.log(e)
                const errorMSG = errorManager(e,arrayError)
                delete e
                res.send(errorMSG)
            })
    }
})

module.exports = router 