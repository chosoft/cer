const express = require('express')
const router = express.Router()

const controller = require('./../../controllers/articulos/viewController')

router.get('/', async (req,res) => {
    try{
        const id = req.session.idUserLog
        if(id === '' || id === undefined || id === null){
            res.redirect('/loguearse')
        }
        const controllerResponse = await controller(id)
        res.render('articulos',{perfilData:controllerResponse.dataRender,articulos:controllerResponse.articles})
    }catch(e){
        console.log(e)
        res.send(e)        
    }
    
    
})


module.exports = router 

