const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    res.render('forms',{name:'registro'})
})

module.exports = router