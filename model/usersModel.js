//Modules
const mongoose = require('mongoose')
const { Schema,model } = mongoose
const { randomNumber } = require('./../utils/functions/index')
const bcrypt = require('bcrypt')
//Schema of the model
const usuarioSchema = new Schema({
    username: {required: true,type:String},
    correo: {required: true,type:String},
    password: {required: true,type:String},
    cargo: {required: true,type:String,default:'Maestro'},
    fecha: {required: true,type:Date,default:Date.now},
    img: {default: 'profileImg/doe.svg',type:String},
    activo: {default:false,type:Boolean},
    rol: {default:'user',type:String},
    banType: {type:Number, default:randomNumber(1,5)},
    cursos: {default: ['all'],type:Array},
})

//Model from schema
const Usuario = new model('Usuario',usuarioSchema)

//Functions CRUD
function saverUser(body){
    return new Promise((resolve, reject) => {
        try{
            //Data to save
            const username = body.username
            const correo = body.correo
            const password = body.password
            
            //Search if user already exists
            Usuario.findOne({correo:correo},function(err,user){
                if(err){
                    reject(err)
                }else if(user === null){
                    //If not exists, then create this
                    const randomInt = randomNumber(1,20)
                    bcrypt.genSalt(randomInt,function(err,salt){
                        if(err){
                            reject(err)
                        }else{
                            //Hash the password
                            bcrypt.hash(password,salt,function(err,hash){
                                if(err){
                                    reject(err)
                                }else{
                                    //Final data to Save
                                    const finalData = {
                                        username,
                                        correo,
                                        password: hash
                                    }
                                    const usuario = new Usuario(finalData)
                                    //Save user
                                    usuario.save((err)=> {
                                        if(err){
                                            reject(err)
                                        }else{
                                            resolve('ok')
                                        }
                                    })
                                }
                            })
                        }
                    })
                }else{  
                    reject('registerYet')
                }
            })
        }catch(e){
            reject(e)
        }
    })
}

function loginUser(body){
    return new Promise((resolve, reject) => {
        try {
            //Data to find
            const data = {
                correo: body.correo,
                password: body.password 
            }
            //Find the mail
            Usuario.findOne({correo:data.correo,activo:true},function(err,user){
                if(err){
                    reject(err)
                }else if(user === null){
                    reject('notUser')
                }else{
                    //Test the password
                    const hash = user.password
                    bcrypt.compare(data.password,hash,function(err,result){
                        if(err){
                            reject(err)
                        }else{
                            if(result){
                                resolve([user._id,body.ip])
                            }else{
                                reject('badLogin')
                            }
                        }
                    })
                }
            })
        }catch (e) {
            reject(e)
        }
    })}

function returnIdData(id){
    return new Promise(async (resolve, reject) => {
        try {
            //Find the user by his id
            const usuario = await Usuario.findById(id)
            const verify = usuario ? true : false

            if(verify){
                const userData = [usuario.username,usuario.cargo,usuario.img,usuario.rol,usuario.banType]
                resolve(userData)
            }else{
                reject('null')
            }
        } catch (err) {
            reject(err)
        }
    })
}

function dataArticle(id){
    return new Promise(async (resolve, reject) => {
        try {
            if(id === '' || id === undefined || id === null){
                reject('idNull')
            }else{
                const userModelResponse = await Usuario.find({_id:id})
                const verify = (userModelResponse[0]) ? true : false
                if(verify){
                    const arrayData = [userModelResponse[0].username, userModelResponse[0].img, userModelResponse[0].banType]
                    resolve(arrayData)
                }else{
                    reject('notUser')
                }
            }
        }catch (e) {
            console.log(e)
            reject(e)
        }
    })
} 

function asd(id) {
    return new Promise(async (resolve, reject) => {
        try {
            
        } catch (e) {

        }
    })
}
function returnPerfilData(id){
    return new Promise((resolve, reject) => {
        if(id === '' || id === undefined || id === null){
            reject('idNull')
        }else{
            Usuario.findById(id, function(err,userData){
                if(err){
                    reject(err)
                }else{
                    const dataPerfil = [userData.correo,userData.fecha]
                    resolve(dataPerfil)
                }
            })
        }
    })
}
function changeUserName(id,username){
    return new Promise((resolve, reject) => {
        Usuario.findByIdAndUpdate(id,{username},(err)=>{
            if(err){
                reject(err)
            }else{
                resolve('changeUserName')
            }
        })
    })
}
function changeImgUser(id,profileImg){
    return new Promise((resolve, reject) => {
        Usuario.findByIdAndUpdate(id,{img:profileImg},(err)=>{
            if(err){
                reject(err)
            }else{
                resolve('ok')
            }
        })
    })
}
function changePasswordUser(id,password){
    return new Promise((resolve, reject) => {
        const random = randomNumber(1,20)
        bcrypt.genSalt(random,function(err,salt){
            if(err){
                reject(err)
            }
            bcrypt.hash(password,salt,function(err,hash){
                if(err){
                    reject(err)
                }
                Usuario.findByIdAndUpdate(id,{password:hash},function(err,query){
                    if(err){
                        reject(err)
                    }else{
                        resolve('ok')
                    }
                })
            })
        })
    })
}

function returnUserByName(nameFilter){
    return new Promise( async (resolve, reject) =>{
        try {
            const users = await Usuario.find({activo:true})
            if(users.length <= 0){
                reject('notUser')
            }else{
                let usersFound = []
                users.forEach(({username,_id},index) => {
                    if(username.toLowerCase().includes(nameFilter)){
                        usersFound.push(_id)
                    }else{
                    }
                })
                resolve(usersFound)
            }
        } catch (e) {
            reject(e)
        }
    })
}
function getAllActiveUsers(){
    return new Promise(async(resolve, reject) => {
        try {
            const usuarios = await Usuario.find({activo:true})
            resolve(usuarios)
        } catch (e) {
            reject(e)
        }
    })
}

function getDataPerfilMaestro(maestro,articulo,id){
    return new Promise(async(resolve, reject) => {
        try {
            let user = await Usuario.find({username:maestro})
            if(user.length <= 0){
                resolve('nullUser')
            }else{
                const userData = {
                    cargo: user[0].cargo,
                    img: user[0].img,
                    activo: user[0].activo,
                    rol: user[0].rol,
                    banType: user[0].banType,
                    _id: user[0]._id,
                    username: user[0].username,
                    correo: user[0].correo,
                }
                resolve(userData)
            }
        } catch (e) {
            reject(e)
        }
    })
}
//Exports functions
module.exports = {
    saveUser:saverUser,
    loginUser,
    dataUser: returnIdData,
    dataArticle: dataArticle,
    dataPerfil: returnPerfilData,
    changeUserName,
    getDataPerfilMaestro,
    changeImgUser,
    changePasswordUser,
    returnUserByName,
    getAllActiveUsers,
}

