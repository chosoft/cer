//Modules
const express = require('express')
const router = express.Router()
//Controllers 
const dashController = require('../../controllers/dash/dash')
//Middleware checker id 
const checker = require('./../../utils/auth/userVerify')
//Routes and his methods
router.get('/',checker,async (req,res) => {
    try {
        const id = req.session.idUserLog 
        const controllerResponse = await dashController(id)
        const articles = controllerResponse.arts.reverse()
        if(articles.length <= 0 ){
            res.render('dash',{perfilData: controllerResponse.perfilData,arts:'nulos',title:'Panel - Blog',id})
        }else{
            res.render('dash',{perfilData: controllerResponse.perfilData,arts:articles,title:'Panel - Blog',id})
        }
    } catch (e) {
        delete e
        res.redirect('/loguearse')
    }
})

module.exports = router