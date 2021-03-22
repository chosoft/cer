const { deleteArticle } = require('./../../model/articlesModel')
function controller(deleterKey){
    return new Promise(async(resolve, reject) => {
        try {
            if(Object.entries(deleterKey).length <= 0){
                reject('notObj')
            }else{
                const deleteArticleResponse = await deleteArticle(deleterKey)
                resolve(deleteArticleResponse)
            }
        } catch (e) {
            reject(e)
        }
/*         if(idUser === undefined || idUser === null || idUser === ''){
            reject('notUser')
        }else{
            if(Object.values(deleterKey).length <= 0){
                reject('notKey')
            }else{
                dataUser(idUser)
                    .then(dataRender => {
                        if(Array.isArray(dataRender) && dataRender.length >= 3){
                            deleteArticle(deleterKey)
                                .then((ok) => resolve(ok))
                                .catch(e => reject(e))
                        }else{
                            reject('notUser')
                        }
                    })
                    .catch(e => reject(e))
            }
        } */
    })
}

module.exports = controller