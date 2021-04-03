const { getArticlesUser } = require('./../../model/articlesModel')
function controller(){
    return new Promise(async(resolve, reject) => {
        try {
            const getArticlesUserResponse = await getArticlesUser()
            resolve(getArticlesUserResponse)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = controller