//Modules
const express = require('express')
const router = express.Router()
//Controllers
const controller = require('./../../controllers/documentos/controller')
const filterController = require('./../../controllers/documentos/filterCont')
//Middleware
const checker = require('./../../utils/auth/userVerify')
//Functions to manager
const managerError = require('./../../utils/errors/typeError')
//Config to error handler
const arrayError = ['userNull','groupNull','notUser','null']
//Routes and his methods
router.get('/',checker, async (req,res) => {
    try{
        const id = req.session.idUserLog
        const query = req.query.g ? req.query.g : 'nulo'
        if(query === 'nulo'){
            const controllerAllResponse = await  controller(id)
            res.render('docs',{...controllerAllResponse,title:'Docs'})
        }else{
            const controllerFilterResponse = await filterController(id,query,true)
            res.render('docsFilter',{...controllerFilterResponse,title:'Documentos',group:query})
        }
    }catch(e){
        const errorLog = managerError(e,arrayError)
        delete e 
        res.redirect('/loguearse')
    }
})

router.post('/',checker,async (req,res)=>{
    try {
        const id = req.session.idUserLog
        const toRetrieve = req.body.filter ? req.body.filter : 'documentos'
        const controllerResponse = await filterController(id,toRetrieve,false)
        res.send(controllerResponse)
    } catch (e) {
        const errorLog = managerError(e,arrayError)
        delete e 
        res.send(errorLog)
    }
})

module.exports = router 