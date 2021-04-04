const express = require('express');
const router = express.Router()

const controller = require('./../../controllers/frontend/maestro')

router.get('/:maestro', async (req, res) => {
    try {
        const maestro = (req.params.maestro) ? req.params.maestro : 'nulo'
        const articleFetch = (req.query.article) ? req.query.article : 'nulo'  
        if(maestro === 'nulo'){
            res.redirect('/maestros')
        }else{
            const response = await controller(maestro,articleFetch)
            const filtered = (articleFetch) ? true : false
            res.render('maestro',{...response,filtered})
        }
    } catch (e) {
        res.render('error')
    }
})

module.exports = router