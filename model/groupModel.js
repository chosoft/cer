//Modules
const mongoose = require('mongoose')
const { Schema,model } = mongoose

//Schema of the model
const groupSchema = new Schema({
    name: {required: true,type:String,default: 'Documentos'},
    url: {required: true,type:String}
})
//Model of Schema
const Group = new model('group',groupSchema)

//Functions CRUD
function getAllGroups(){
    return new Promise((resolve, reject) => {
        //Search all groups create in the DB
        Group.find({},function(err,groups){
            if(err){
                reject(err)
            }else{
                resolve(groups)
            }
        })
    })
}

//Exports Functions

module.exports = {
    getGroups: getAllGroups
}