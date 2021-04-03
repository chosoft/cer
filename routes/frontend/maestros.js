const express = require('express')
const router = express.Router()

const controller = require('./../../controllers/frontend/maestros')

router.get('/',async(req,res) => {
    try {
        const controllerResult = await controller()
        res.render('maestros',{maestros:controllerResult})
    } catch (e) {
        res.render('error')
    }
})

module.exports = router