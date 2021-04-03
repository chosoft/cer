const { returnUserByName } = require('./../../model/usersModel')
const { getArticleUserById,getArticlesUser,getArticlesUserParagraphs } = require('./../../model/articlesModel')
function controller(filter,filterType){
    return new Promise(async (resolve, reject) => {
        try {
            if(filterType === 'maestro'){
                
                const usersFound = await returnUserByName(filter)
                if(usersFound.length <= 0){
                    reject('notUsers')
                }else{
                    const modelNameResponse =  await getArticleUserById(usersFound)
                    if(modelNameResponse.length <= 0){
                        resolve('nulos')
                    }else{
                        resolve(modelNameResponse)
                    }
                }
            }else if(filterType === 'fecha'){
                const modelDateResponse = await getArticlesUser()

                if(modelDateResponse.length <= 0){
                    resolve('nulos')
                }else{
                    if(filter === 'less'){
                        modelDateResponse.sort((a,b)=>{
                            return new Date(a.date) - new Date(b.date)
                        })
                        resolve(modelDateResponse)
                    }else{
                        modelDateResponse.sort((a,b)=>{
                            return new Date(b.date) - new Date(a.date)
                        })
                        resolve(modelDateResponse)
                    }
                }
            }else if(filterType === 'palabra'){
                const modelWordResponse = await getArticlesUserParagraphs()
                if(modelWordResponse.length <= 0){
                    resolve('nulos')
                }else{
                    let finalData = []
                    let finalObj = {}
                    let actParagraph = ''
                    modelWordResponse.forEach(({parrafos,_id,titulo,creadorId,date,usernameCreator,imgCreator,banType},index) => {
                        parrafos.forEach(parrafo => {
                            actParagraph = parrafo.split(' ')
                            for (let i = 0; i < actParagraph.length; i++) {  
                                if(actParagraph[i].toLowerCase().trim().includes(filter)){
                                    finalObj = {
                                        _id,
                                        titulo,
                                        date,
                                        creadorId,
                                        usernameCreator,
                                        imgCreator ,
                                        banType ,
                                    }
                                    finalData.push(finalObj)

                                }else{

                                }
                            }
                        })
                        if(index+1 === modelWordResponse.length){
                            resolve(finalData)
                        }else{

                        }
                    })
                }
            }else{
                reject('notValidFilter')
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller