const express = require('express')
const router = express.Router()

const controller = require('./../../controllers/articulos/apiSaveUserArticle')
router.post('/', async (req,res) => {
    try{
        const id = req.session.idUserLog 
    
        if(id === '' || id === null || id === undefined){
            res.send('notUser')
        }
    
        const controllerResult = await controller(id,req.body)
    }catch(e){
        res.send(e)
    }
})

module.exports = router