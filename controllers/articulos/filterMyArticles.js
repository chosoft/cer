const { returnUserByName } = require('./../../model/usersModel')
const { getArticleUserById,getArticlesUser } = require('./../../model/articlesModel')
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
                const modelWordResponse = await getArticlesUser()
                if(modelWordResponse.length <= 0){
                    resolve('nulos')
                }else{
                    let finalData = []
                    let finalObj = {}
                    modelWordResponse.forEach(({parrafos,_id,titulo,creadorId,date,usernameCreator,imgCreator,banType},index) => {
                        parrafos.forEach(parrafo => {
                            parrafo.split(' ')
                            for (let i = 0; i < parrafo.length; i++) {  
                                if(parrafo[i].toLowerCase().trim() === filter.toLowerCase()){
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
                                    if(index+1 === modelWordResponse.length){
                                        resolve(finalData)
                                    }else{

                                    }
                                }else{

                                }
                            }
                        })
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