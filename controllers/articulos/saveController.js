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
/*         if(id === undefined || id === null || id === ''){
            reject('dataNull')
        }else{
            if(Object.keys(obj).length <= 0){
                reject('objNull')
            }else{
                const finalData = {
                    ...obj,
                    creadorId:id,
                    ip
                }
                saveArticle(finalData)
                    .then((response) =>{
                        resolve(response)
                    })
                    .catch(e => {
                        reject(e)
                    })
            }
        } */
    })
}

module.exports = controller