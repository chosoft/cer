const { dataUser } = require('./../../model/usersModel')
const { config } = require('./../../config/config')
function verify(id){
    return new Promise((resolve, reject) => {
        try {            
            if(id === undefined || id === null || id === ''){
                reject('idUndefined')
            }else{
                dataUser(id).then(dataUser => {
                    if(Array.isArray(dataUser) && dataUser.length === 3){
                        resolve('ok')
                    }else{
                        reject('notUserFound')
                    }
                })
            }
        } catch (e) {
            if(config.env === 'development'){
                reject(e)
            }else{
                delete e
                reject('error')
            }
        }
    })
}

module.exports = verify