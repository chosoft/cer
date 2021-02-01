const { dataUser } = require('./../../model/usersModel')
const upload = require('./../../config/imgMulter')
const fileUp = upload.single('myFiles')
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
                                conosole.log(req.file)
                                if(Object.keys(req.file).length <= 0 || req.file === undefined){
                                    reject('imgNull')
                                }else{
                                    if(err){
                                        reject(err)
                                    }else{
                                        console.log(req.file)
                                    }
                                }
                            })
                        }else{

                        }
                    }else{
                        reject('notUser')
                    }
                })
        }
    })
}

module.exports = controller