//Modules
const mongoose = require('mongoose')
const { Schema,model,Types } = mongoose
const { dataArticle } = require('./usersModel.js')
//Schema of the model
const articulosBlogSchema = new Schema({
    titulo: {required: true,type:String},
    parrafos: {required: true,type:Array},
    creadorId: {required: true,type:mongoose.ObjectId},
    date: {required: true,type:Date,default: Date()},
    visible: {required: true,type:Boolean, default: false},
    ip: {required: true,type:String}
})
const eraserSchema = new Schema({
    title: {required: true,type:String},
    paragraphs: {required: true,type:Array},
    ownerId: {required: true,type:mongoose.ObjectId},
    date: {required: true,type:Date,default: Date()},
    group: {required: true,type:String,default:'dash'}
})
const myArticlesSchema = new Schema({
    titulo: {required: true,type:String},
    parrafos: {required: true,type:Array},
    creadorId: {required: true,type:mongoose.ObjectId},
    date: {required: true,type:Date,default: Date()},
    visible: {required: true,type:Boolean, default: false},
    ip: {required: true,type:String}
})
//Model from schema
const Articulo = new model('Articulo',articulosBlogSchema)
const Eraser = new model('Eraser',eraserSchema) 
const MyArticle = new model('ArticuloUser',myArticlesSchema)

//Functions CRUD
function getAllArcticles(){
    return new Promise(async (resolve, reject) => {
        //Find all the articles
        try{

            const articulos = await Articulo.find()
            if(articulos.length <= 0){
                resolve(articulos)
            }else{
                
            }
                let allArticleData = {}
                let allArrayData = []
                if(articulos.length <= 0){
                    resolve(articulos)
                }else{
                    articulos.forEach(async (dato,index) => {
                        const userOwnerData = await dataArticle(dato.creadorId)
                        allArticleData = {
                            _id: dato._id,
                            titulo: dato.titulo,
                            date: dato.date,
                            parrafos: dato.parrafos,
                            creadorId: dato.creadorId,
                            usernameCreator: userOwnerData[0],
                            visible:dato.visible,
                            imgCreator: userOwnerData[1],
                            banType: userOwnerData[2],
                        }
                        allArrayData.push(allArticleData)
                        if(index+1 === articulos.length){
                            resolve(allArrayData)

                        }else{

                        }
                        
                    })
                }
        }catch (e) {
            console.log(e)
            reject(e)
        }
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
    return new Promise((resolve, reject) => {
        const article = new Articulo(body)
        article.save((err) => {
            if(err){
                reject(err)
            }else{
                resolve('ok')
            }
        })
    })
}
function saveArticleUser(body){
    //Waiting for complete this function
    return new Promise((resolve, reject) => {
        const article = new MyArticle(body)
        article.save((err) => {
            if(err){
                reject(err)
            }else{
                resolve('ok')
            }
        })
    })
}
function changeVisibility(key,visibility){
    return new Promise((resolve, reject) => {
        console.log(key,visibility)
        Articulo.findOneAndUpdate({_id:key},{visible:visibility},(err)=>{
            if(err){
                reject(err)
            }else{
                resolve('ok')
            }
        })
    })
}
function changeVisibilityUser(key,visibility){
    return new Promise((resolve, reject) => {
        MyArticle.findOneAndUpdate({_id:key},{visible:visibility},(err)=>{
            if(err){
                reject(err)
            }else{
                resolve('ok')
            }
        })
    })
}
function deleteArticle(key){
    return new Promise((resolve, reject) => {
        const {deleterKey} = key
        Articulo.findByIdAndDelete(deleterKey, (err) => {
            if(err){
                reject(err)
            }else{
                resolve('ok')
            }
        })
    })
}
function deleteArticleUser(key){
    return new Promise((resolve, reject) => {
        const {deleterKey} = key
        MyArticle.findByIdAndDelete(deleterKey, (err) => {
            if(err){
                reject(err)
            }else{
                resolve('ok')
            }
        })
    })
}
function getMyArticles(id){
    return new Promise(async (resolve, reject) => {
        try {
            const docs = await MyArticle.find({creadorId:id})
            if(docs === '' || docs === null || docs.length <= 0){
                resolve('nulos')
            }else{
                const dataUser = await dataArticle(id)
                let finalDocs = []
                let finalObj = {}
                docs.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                })
                docs.forEach(dato => {
                    finalObj = {
                        _id: dato._id,
                        parrafos: dato.parrafos,
                        titulo: dato.titulo,
                        date: dato.date,
                        creadorId: dato.creadorId,
                        visible: dato.visible,
                        usernameCreator:dataUser[0],
                        imgCreator:dataUser[1],
                    }
                    finalDocs.push(finalObj)
                    if(docs.length === finalDocs.length){
                        resolve(finalDocs)
                    }else{

                    }
                })
            }
        }catch(e){
            reject(e)
        }
    })
}
function getArticlesUser(){
    return new Promise(async (resolve, reject) => {
        try {
            const articlesUsers = await MyArticle.find({visible: true})
            if(articlesUsers.length <= 0){
                resolve('nulos')
            }else{
                let articleResponse = ''
                let finalObj = {}
                let finalArray = []
                articlesUsers.forEach(async(article) => {
                    articleResponse = await dataArticle(article.creadorId)
                    finalObj = {
                        _id: article._id,
                        titulo: article.titulo,
                        date: article.date,
                        creadorId: article.creadorId,
                        usernameCreator: articleResponse[0],
                        imgCreator: articleResponse[1],
                        banType: articleResponse[2],
                    }
                    finalArray.push(finalObj)

                    if(finalArray.length === articlesUsers.length){
                        resolve(finalArray)
                    }else{

                    }
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}
function getArticlesUserParagraphs(){
    return new Promise(async(resolve, reject)=> {
        try {
            const articlesUsers = await MyArticle.find({visible: true})
            if(articlesUsers.length <= 0){
                reject('nulos')
            }else{
                let articleResponse = ''
                let finalObj = {}
                let finalArray = []
                articlesUsers.forEach(async(article) => {
                    articleResponse = await dataArticle(article.creadorId)
                    finalObj = {
                        _id: article._id,
                        titulo: article.titulo,
                        date: article.date,
                        parrafos: article.parrafos,
                        creadorId: article.creadorId,
                        usernameCreator: articleResponse[0],
                        imgCreator: articleResponse[1],
                        banType: articleResponse[2],
                    }
                    finalArray.push(finalObj)
    
                    if(finalArray.length === articlesUsers.length){
                        resolve(finalArray)
                    }else{
    
                    }
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
function getArticleUserById(idArray){
    return new Promise(async(resolve, reject) => {
        try {
            let finalData = []
            let finalObj = {}
            idArray.forEach(async (id,index) => {
                let userAddData = await dataArticle(id)
                let articlesUser = await MyArticle.find({creadorId:id,visible:true})
                if(articlesUser.length <= 0){
                    if(index+1 === idArray.length){
                        resolve(finalData)
                    }else{
    
                    }
                }else{
                    articlesUser.forEach((art,indexArt) => {
                        finalObj = {
                            _id: art._id,
                            titulo: art.titulo,
                            date: art.date,
                            creadorId: art.creadorId,
                            usernameCreator: userAddData[0],
                            imgCreator: userAddData[1],
                            banType: userAddData[2],
                        }
                        finalData.push(finalObj)
                        if(indexArt+1 === articlesUser.length){
                            if(index+1 === idArray.length){
                                resolve(finalData)
                            }else{
            
                            }    
                        }else{

                        }
                    })
                }

            })
        } catch (e) {
            reject(e)
        }
    })
}
function getAllArticlesFrontend(){
    return new Promise(async(resolve, reject) => {
        try {
            const articles = await Articulo.find({visible: true})
            if(articles.length <= 0){
                resolve('nulos')
            }else{
                let finalObj = {}
                let finalArray = []
                articles.forEach(async (article,index) => {
                    const user = await dataArticle(article.creadorId)
                    finalObj = {
                        _id: article._id,
                        titulo: article.titulo,
                        date: article.date,
                        parrafos: article.parrafos,
                        creadorId: article.creadorId,
                        usernameCreator: user[0],
                        visible:article.visible,
                        imgCreator: user[1],
                        banType: user[2],
                    }
                    finalArray.push(finalObj)
                    if(index+1 === articles.length){
                        finalArray.sort((a,b) => {
                            return new Date(b.date) - new Date(a.date)
                        })
                        resolve(finalArray)
                    }else{

                    }
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

function getSimpleArticle(user,articulo){
    return new Promise(async(resolve, reject) => {
        try {
            const filter = (articulo === 'nulo') ? {creadorId:user._id,visible:true} : {_id:Types.ObjectId(articulo),creadorId:user._id,visible:true}
            const articles = await MyArticle.find(filter)
            if(articles.length <= 0){
                resolve('nulos')
            }else{
                let finalArray = []
                let finalObj = {}
                articles.forEach((article,index) => {
                    finalObj =  {
                        _id: article._id,
                        titulo: article.titulo,
                        date: article.date,
                        parrafos: article.parrafos,
                        creadorId: article.creadorId,
                        usernameCreator: user.username,
                        visible:article.visible,
                        imgCreator: user.img,
                        banType: user.banType,
                    }
                    finalArray.push(finalObj)
                    if(index+1 === articles.length){
                        resolve(finalArray)
                    }else{

                    }
                })
            }
        } catch (e) {
            reject(e)
        } 
    })
}
//Exports Functions
module.exports = {
    getArticles:getAllArcticles,
    changeVisibilityUser,
    saveArticle,
    saveArticleUser,
    saveEraser,
    deleteArticle,
    changeVisibility,
    deleteArticleUser,
    getMyArticles,
    getArticlesUser,
    getArticleUserById,
    getArticlesUserParagraphs,
    getAllArticlesFrontend,
    getSimpleArticle,
}