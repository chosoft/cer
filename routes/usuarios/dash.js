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
        const articles = controllerResponse.arts
        console.log(controllerResponse)
        if(articles.length <= 0 ){
            res.render('dash',{perfilData: controllerResponse.perfilData,arts:'nulos',title:'Panel - Blog',id})
        }else{
            articles.sort((a,b) => {
                return new Date(b.date) - new Date(a.date)
            })
            res.render('dash',{perfilData: controllerResponse.perfilData,arts:articles,title:'Panel - Blog',id})
        }
    } catch (e) {
        console.log(e)
        delete e
        res.send('/')
    }
})

module.exports = router