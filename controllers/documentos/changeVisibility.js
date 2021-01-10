const { dataUser } = require('./../../model/usersModel')
const { changeVisibility } = require('./../../model/documentModel')
function controller(id,keyMongo,visibility){
    return new Promise((resolve, reject) => {
        if(id === undefined || id === null || id === ''){
            reject('notUser')
        }else{
            if(keyMongo === undefined || keyMongo === null || keyMongo === ''){
                reject('notKey')
            }else{
                if(typeof visibility === 'boolean'){
                    dataUser(id)                    
                        .then(dataRender => {
                            if(Array.isArray(dataRender) && dataRender.length >= 3){
                                changeVisibility(keyMongo,visibility)
                                    .then(ok => resolve(ok))
                                    .catch(e => reject(e))
                            }else{
                                reject('notUser')
                            }
                        })
                }else{
                    reject('notVisibility')
                }
            }
        }
    })
}

module.exports = controller