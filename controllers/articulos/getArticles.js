const { getArticles } = require('./../../model/articlesModel')
const { dataUser } = require('./../../model/usersModel')
function controller(id){
    return new Promise(async(resolve, reject) => {
        try {
            const articlesResponse = await getArticles()
            const role = await dataUser(id)
            if(articlesResponse.length <= 0){
                resolve(['nulos',role[3]])
            }else{
                let sortedArticles = []
                for(let i = 0; i < articlesResponse.length; i++){
                    console.log(articlesResponse[i].parrafos)
                    sortedArticles.unshift(articlesResponse[i])
                }
                resolve([sortedArticles,role[3]])
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller