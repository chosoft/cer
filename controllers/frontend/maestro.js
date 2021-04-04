const { getDataPerfilMaestro } = require('./../../model/usersModel')

function controller(maestro,articulo){
    return new Promise(async(resolve,reject) => {
        try {
            const getDataPerfil = await getDataPerfilMaestro(maestro,articulo)
            resolve(getDataPerfil)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller