const { dataUser } = require('./../../model/usersModel')
const { deleteArticle } = require('./../../model/articlesModel')
function controller(idUser,deleterKey){
    return new Promise((resolve, reject) => {
        if(id === undefined || id === null || id === ''){
            reject('notUser')
        }else{
            if(Object.keys(deleterKey).length <= 0){
                reject('notKey')
            }else{
                dataUser(idUser)
                    .then(dataRender => {
                        if(Array.isArray(dataRender) && dataRender.length >= 3){
                            const { id } = deleterKey
                            deleteArticle(id)
                                .then((ok) => resolve(ok))
                                .catch(e => reject(e))
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