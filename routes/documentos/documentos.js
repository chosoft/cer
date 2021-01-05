//Modules
const express = require('express')
const router = express.Router()
//Controllers
const controller = require('./../../controllers/documentos/controller')
const filterController = require('./../../controllers/documentos/filterCont')
//Functions to manager
const managerError = require('./../../utils/errors/typeError')
//Config to error handler
const arrayError = ['userNull','groupNull','notUser','null']
//Routes and his methods
router.get('/',(req,res) => {
    if(req.session.idUserLog === undefined){
        res.redirect('/loguearse')
    }else{
        const idUser = req.session.idUserLog

        if(req.query.g === undefined || req.query.g === null || req.query.g === ''){
            //Not filter
            controller(idUser).then((data) => {
                res.render('docs',{perfilData: data[0],grupos: data[1],title: 'Docs'})
            }).catch((err) =>{
                delete err
                res.redirect('/loguearse')
            })
        }else{
            //Filter by group
            const searchFiles = req.query.g
            filterController(idUser,searchFiles).then(allData => {
                if(Array.isArray(allData[1]) && allData[1].length > 0){
                    res.render('docsFilter',{perfilData:allData[0],docs:allData[1].reverse(),title:'Documentos',group:searchFiles});
                }else{
                    res.render('docsFilter',{perfilData:allData[0],docs:'null',title:'Documentos', group:searchFiles});
                }
            }).catch((err) =>{
                const errorLog = managerError(e,arrayError)
                delete err
                res.send(errorLog)
            })
            
        }
    }
})

router.post('/',(req,res)=>{
    if(req.session.idUserLog === undefined){
        res.send('errorLog')
    }else{
        const idUser = req.session.idUserLog
        const toRetrieve = req.body.filter || 'documentos';
        filterController(idUser,toRetrieve).then(data => {
            if(data[1] === 'nulos'){
                res.send(data[1])
            }else{
                res.send(data[1].reverse())
            }
        }).catch(e => {
            delete e
            res.send('errorRetrieve')
        })
    }
})

module.exports = router 