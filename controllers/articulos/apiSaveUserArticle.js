const { saveArticleUser } = require('./../../model/articlesModel')
function controller(id,ip,obj){
    return new Promise(async (resolve,reject) => {
        try{
            if(Object.keys(obj).length <= 0){
                reject('notObj')
            }else{
                const finalData = {
                    ...obj,
                    ip,
                    creadorId:id,
                }
                const modelResponse = await saveArticleUser(finalData)
                resolve(modelResponse)
            }
        }catch(e){
            reject(e)
        }
    })
}

module.exports = controller