const { deleteArticleUser } = require('./../../model/articlesModel')
function controller(deleterKey){
    return new Promise(async(resolve, reject) => {
        try {
            if(Object.entries(deleterKey).length <= 0){
                reject('notObj')
            }else{
                const deleteArticleResponse = await deleteArticleUser(deleterKey)
                resolve(deleteArticleResponse)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller