const express = require('express')
const router = express.Router()

const controller = require('./../../controllers/frontend/blog')

router.get('/',async(req,res) =>{
    try {
        const controllerResponse = await controller()
        res.render('blog',{articulos:controllerResponse})
    } catch (e) {
        res.render('error')
    }
})

module.exports = router