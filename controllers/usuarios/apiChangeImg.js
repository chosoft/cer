const { dataUser,changeImgUser } = require('./../../model/usersModel')
const upload = require('./../../config/imgMulter')
const fileUp = upload.single('myFiles')
const deleterFile = require('./../../utils/fileManager/deleteDoc')
function controller(id,req,res){
    return new Promise((resolve,reject) => {
        if(Object.keys(req).length <= 0 || Object.keys(res).length <= 0){
            reject('someDataNull') 
        }else{
            dataUser(id)
                .then(dataRender => {
                    if(Array.isArray(dataRender) && dataRender.length >= 3){
                        if(dataRender[2] === 'profileImg/doe.svg'){
                            fileUp(req,res, (err) => {
                                if(Object.keys(req.file).length <= 0 || req.file === undefined){
                                    reject('imgNull')
                                }else{
                                    if(err){
                                        reject(err)
                                    }else{
                                        changeImgUser(id,`profileImg/${req.file.filename}`)
                                            .then(ok => resolve(ok))
                                            .catch(err => reject(err))
                                    }
                                }
                            })
                        }else{
                            //delete img and replace
                            fileUp(req,res, (err) => {
                                if(Object.keys(req.file).length <= 0 || req.file === undefined){
                                    reject('nullImg')
                                }else{
                                    if(err){
                                        reject(err)
                                    }else{
                                        const imgDeleteName = dataRender[2].substring(dataRender[2].indexOf('/')+1)
                                        deleterFile(`profileImg/${imgDeleteName}`)
                                            .then(ok => {
                                                changeImgUser(id,`profileImg/${req.file.filename}`)
                                                    .then(ok => resolve(ok))
                                                    .catch(err => reject(err))
                                            })
                                            .catch(err => reject(err))
                                    }
                                }
                            })
                        }
                    }else{
                        reject('notUser')
                    }
                })
        }
    })
}

module.exports = controller