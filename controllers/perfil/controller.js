const { dataUser,dataPerfil } = require('./../../model/usersModel')
function controller(id){
    return new Promise((resolve, reject) => {
        if(id === '' || id === null || id === undefined){
            reject('notUser')
        }else{
            dataUser(id)
                .then(dataRender => {
                    if(Array.isArray(dataRender) && dataRender.length >= 3 ){
                        dataPerfil(id)
                            .then(dataPerfil => {
                                resolve([dataRender,dataPerfil])
                            })
                            .catch(e => reject(e))
                    }else{
                        reject('notUser')
                    }
                })
                .catch(e => {
                    reject(e)
                })
        }
    })
}

module.exports = controller