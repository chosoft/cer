const { dataUser } = require('./../../model/usersModel')
const { saveEraser } = require('./../../model/articlesModel')
function controller(id,obj){
    return new Promise((resolve, reject) => {
        if(id === undefined || id === null || id === '' ){
            reject('notUser')
        }else{
            if(Object.keys(obj).length <= 0){
                reject('notObj')
            }else{
                dataUser(id)
                    .then(data => {
                        if(Array.isArray(data) && data.length >= 3){
                            if(obj.paragraphs.length <= 0){
                                reject('dataNull')
                            }else{
                                saveEraser(obj,id)
                                    .then(data => {
                                        resolve(data)
                                    })
                                    .catch(e => {
                                        reject(e)
                                    })
                            }
                        }else{
                            reject('notUser')
                        }
                    })
                    .catch(e => reject(e))
            }
        }
    })
}
module.exports = controller