//Modules
const mongoose = require('mongoose')
const { Schema,model } = mongoose
const { dataArticle } = require('./usersModel')
//Schema of the model
const articulosBlogSchema = new Schema({
    titulo: {required: true,type:String},
    parrafos: {required: true,type:Array},
    creadorId: {required: true,type:mongoose.ObjectId},
    date: {required: true,type:Date,default: Date.now()},
    visible: {required: true,type:Boolean, default: false},
    ip: {required: true,type:String}
})
const eraserSchema = new Schema({
    title: {required: true,type:String},
    paragraphs: {required: true,type:Array},
    ownerId: {required: true,type:mongoose.ObjectId},
    date: {required: true,type:Date,default: Date.now()},
    group: {required: true,type:String,default:'dash'}
})
//Model from schema
const Articulo = new model('Articulo',articulosBlogSchema)
const Eraser = new model('Eraser',eraserSchema) 

//Functions CRUD
function getAllArcticles(){
    return new Promise((resolve, reject) => {
        //Find all the articles
        Articulo.find({},function(err,articles){
            if(err){
                reject(err)
            }else if(articles === null){
                reject('notArticles')
            }else{
                let allArticleData
                let allArrayData = []
                //Search the user that create the article
                articles.forEach(dato => {
                    dataArticle(id).then(usuarioData => {
                        //All data of the article
                        allArticleData = {
                            _id: dato._id,
                            parrafos: dato.parrafos,
                            titulo: dato.titulo,
                            date: dato.date,
                            usernameCreator: usuarioData[0],
                            imgCreator: usuarioData[1]
                        }
                        allArrayData.push(allArticleData)
                    }).catch(e => {
                        reject(e)
                    })
                })

                resolve(allArrayData)
            }
        })
    })
}
function saveEraser(body,id){
    return new Promise((resolve, reject) => {
        if(Object.keys(body).length <= 0){
            reject('notObj')
        }else{
            const finalData = {
                ...body,
                ownerId:id
            }
            const eraser = new Eraser(finalData)
            eraser.save((err)=> {
                if(err){
                    reject(err)
                }else{
                    resolve('ok')
                }
            })
        }
    })
}
function saveArticle(body){
    //Waiting for complete this function
    return new promise((resolve, reject) => {
        try {
            if(body === '' || body === undefined || body === null){
                reject('nullData')
            }else{ 
                resolve('ok')
            }
        } catch (err) {
            reject(err)
        }
    })
}

//Exports Functions
module.exports = {
    getArticles:getAllArcticles,
    saveArticle,
    saveEraser
}