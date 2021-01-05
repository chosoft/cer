//Modules
const mongoose = require('mongoose')
const { Schema,model } = mongoose

//Schema of the model
const entrySchema = new Schema({
    idUser: {required: true,type:mongoose.ObjectId},
    date: {required: true,type:Date,default: Date.now()},
    ip: {required: true,type:String}
})

//Model from schema
const Entry = new model('Entry',entrySchema)

//Functions CRUD
function addEntry(id,ip){
    return new Promise((resolve, reject) =>{
        try{
            //checking his ip and id
            if(id === '' || ip === ''){
                reject('dataNull')
            }else{
                //all data of entry
                const dataEntry = {
                    idUser: id,
                    ip: ip
                }
                //Create the entry
                const entryNew = new Entry(dataEntry)
                entryNew.save((err)=> {
                    if(err){
                        reject(err)
                    }else{
                        resolve(id)
                    }
                })
            }
        }catch(e){
            reject(e)
        }
    })
}

//Exports Functions
module.exports = {
    addEntry
}