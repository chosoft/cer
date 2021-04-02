const express = require('express');
const router = express.Router()


const managerError = require('./../../utils/errors/typeError')
const arrayError = []

router.get(('/'),async (req,res) =>{
    try {
        const controllerResponse = await controller()

        res.render('articuloscer',{articulos:controllerResponse})
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.render('error',{msg: errorLog})
    }
})

module.exports = router