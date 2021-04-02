const { getArticlesUser } = require('./../../model/articlesModel')
function controller(){
    return new Promise(async(resolve, reject) => {
        try {
            const getArticlesUser = await getArticlesUser
            resolve(getArticlesUser)
        } catch (e) {
            reject(e);
        }
    })
}