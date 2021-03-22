const { dataUser } = require('./../../model/usersModel')
const { getMyArticles } = require('./../../model/articlesModel')
function controller(id){
    return new Promise(async (resolve, reject) => {
        try{
            const dataRender = await dataUser(id)        
            if(Array.isArray(dataRender) && dataRender.length >= 3){
                const myArticles = await getMyArticles(id)
                console.log(myArticles)
                resolve({articles:myArticles,dataRender})
            }
            reject('notUser')
        }catch(e){
            reject(e)
        }
    })
}

module.exports = controller