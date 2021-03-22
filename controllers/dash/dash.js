//Models to retrieve the data
const { dataUser } = require('./../../model/usersModel') 
const { getArticles } = require('./../../model/articlesModel')

function controller(id) {
    return new Promise( async(resolve, reject) => {
        try {
            const perfilData = await dataUser(id)
            const arts = await getArticles()
            resolve({perfilData,arts})
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller