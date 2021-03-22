const { saveEraser } = require('./../../model/articlesModel')
function controller(id,obj){
    return new Promise(async(resolve, reject) => {
        try {
            if(Object.entries(obj).length <= 0){
                reject('notObj')
            }else{
                const saveEraserResponse = await saveEraser(obj,id)
                resolve(saveEraserResponse)
            }
        } catch (e) {
            reject(e)
        }
/*         if(id === undefined || id === null || id === '' ){
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
        } */
    })
}
module.exports = controller