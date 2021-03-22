const { dataUser,dataPerfil } = require('./../../model/usersModel')

function controller(id){
    return new Promise(async (resolve, reject) => {
        try {
            const perfilData = await dataUser(id)
            const perfilUserData = await dataPerfil(id)
            resolve({perfilData, perfilUserData})
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller