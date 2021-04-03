const express = require('express')
const router = express.Router()

const controller = require('./../../controllers/articulos/filterMyArticles')

const managerError = require('./../../utils/errors/typeError')
const arrayError = ['notUsers','notUser', 'nulos']

router.post('/', async(req, res)=> {
    try {
        if(Object.keys(req.body).length <=0){
            res.send('nullFilter')
        }else{
            const { filter,filterType } = req.body
            const controllerResponse = await controller(filter,filterType)
            res.send(controllerResponse)
        }
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.send(errorLog)        
    }
})

module.exports = router
