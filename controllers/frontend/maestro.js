const { getDataPerfilMaestro } = require('./../../model/usersModel')
const { getSimpleArticle } = require('./../../model/articlesModel')
const { getAllDocsUsersId } = require('../../model/documentModel')

function controller(maestro,articulo){
    return new Promise(async(resolve,reject) => {
        try {
            const getDataPerfil = await getDataPerfilMaestro(maestro,articulo)
            const getArticleType = await getSimpleArticle(getDataPerfil,articulo)
            const getDocs = await getAllDocsUsersId(getDataPerfil._id)
            resolve({user:getDataPerfil,articulos:getArticleType,docs:getDocs})
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller