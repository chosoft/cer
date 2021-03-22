const express = require('express');
const router = express.Router()

const checker = require('./../../utils/auth/userVerify')

router.get('/',checker,(req, res) =>{
    res.send('asd')
})
router.post('/',checker,(req, res) =>{
    res.send('ok')
})
module.exports = router 