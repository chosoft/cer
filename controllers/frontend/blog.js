const { getAllArticlesFrontend } = require('./../../model/articlesModel')
function controller(){
    return new Promise(async(resolve, reject) => {
        try {
            const articles = await getAllArticlesFrontend()
            resolve(articles)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = controller