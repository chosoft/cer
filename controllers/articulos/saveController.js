const { saveArticle } = require('./../../model/articlesModel')
function controller(id,obj,ip){
    return new Promise(async(resolve, reject) => {
        try {
            if(Object.keys(obj).length <= 0){
                reject('notObj')
            }else{
                const data = {
                    ...obj,
                    creadorId:id,
                    ip
                }
                const saveArticleResponse = await saveArticle(data)
                resolve(saveArticleResponse)
            }
        } catch (e) {
            reject(e)
        }

    })
}

module.exports = controller