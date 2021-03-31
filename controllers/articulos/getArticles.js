const { getArticles } = require('./../../model/articlesModel')
const { dataUser } = require('./../../model/usersModel')
function controller(id){
    return new Promise(async(resolve, reject) => {
        try {
            let articlesResponse = await getArticles()
            const role = await dataUser(id)
            if(articlesResponse.length <= 0){
                resolve(['nulos',role[3]])
            }else{
                articlesResponse.sort((a,b)=>{
                    return new Date(b.date) - new Date(a.date)
                })
                resolve([articlesResponse,role[3]])
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller