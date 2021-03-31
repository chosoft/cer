const { dataUser } = require('./../../model/usersModel')
const { getMyArticles } = require('./../../model/articlesModel')
function controller(id,initializate){
    return new Promise(async (resolve, reject) => {
        try{
            if(initializate){
                const perfilData = await dataUser(id)        
                const myArticles = await getMyArticles(id)
                resolve({arts:myArticles,perfilData})
            }else{
                const myArticles = await getMyArticles(id)
                resolve(myArticles)
            }
        }catch(e){
            reject(e)
        }
    })
}

module.exports = controller