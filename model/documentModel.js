//Modules
const mongoose = require('mongoose')
const { Schema,model } = mongoose

//Schema of the model
const documentosSchema = new Schema({
    ruta: {required: true,type:String},
    date: {required: true,type:Date,default: Date.now()},
    owner: {required: true,type:mongoose.ObjectId},
    name: {required: true,type:String},
    type: {required: true,type:String},
    ip: {required: true,type:String},
    group: {required: true,type:String,default:'documentos'},
    visible: {required: true,type:Boolean,default:false}
})
//Model of Schema
const Documento = new model('Documento',documentosSchema)

//Functions CRUD
function getAllDocs(filter){
    return new Promise((resolve, reject) =>{
        //Search all docs
        Documento.find({group:filter},function(err,docs){
            if(err){
                reject(err)
            }else{
                resolve(docs)
            }
        })
    })
}

async function saveDocs(obj){
    return new Promise((resolve, reject) => {
        //Save the data for the document
        saveMany(obj)
            .then((uploadFiles) =>{
                resolve('ok')
            })
            .catch(e =>{
                reject(e)
            })
    })
}

function deleteDoc(key){
    return new Promise((resolve, reject) => {
        //Extracting the data for delete the document
        const idMongo = key
        //Search the document by his id
        Documento.findById(idMongo,(err,doc)=>{
            if(err){
                reject(err)
            }else{
                const routeDelete = doc.ruta
                Documento.findByIdAndDelete(idMongo,(err)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(routeDelete)
                    }
                })
            }
        })
    })
}
function getFilterDocs(type){
    return new Promise((resolve, reject) => {
        Documento.find({type},(err,docs) => {
            if(err){
                reject(err)
            }else{
                if(docs === null || docs.length <= 0 ){
                    resolve('nulos')
                }else{
                    resolve(docs)
                }
            }
        }) 
    })
}
function saveMany(obj){
    return new Promise((resolve, reject) => {
        let docs 
        let oneDoc
        for(let i = 0; i < obj.names.length; i++){
            oneDoc = {
                ruta:obj.rutas[i],
                owner: obj.owner,
                name:obj.names[i],
                type:obj.types[i],
                ip:obj.ip,
                group: obj.group,
                visible: obj.visible[i]
            }
            docs = new Documento(oneDoc)
            docs.save((err) => {
                if(err){
                    reject(err)
                }else{
                    
                }
            })
        }
        resolve('ok')
    })
}
//Exports Functions
module.exports = {
    getDocs: getAllDocs,
    saveDocs,
    deleteDoc,
    filterDocs: getFilterDocs
}