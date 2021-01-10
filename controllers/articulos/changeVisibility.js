const { dataUser } = require('./../../model/usersModel')
const { changeVisibility } = require('./../../model/articlesModel')
function controller(id,keyChange,visibility) {
    return new Promise((resolve, reject) => {
        if(id === undefined || id === null || id === ''){
            reject('notUser')
        }else{
            if(keyChange === '' || keyChange === undefined || keyChange === null){
                reject('notKey')
            }else{
                if(typeof visibility === 'boolean'){
                    dataUser(id)
                        .then(dataRender => {
                            if(Array.isArray(dataRender) && dataRender.length >=3){
                                changeVisibility(keyChange,visibility)
                                    .then(ok => resolve(ok))
                                    .catch(e => reject(e))
                            }else{
                                reject('notUser')
                            }
                        })
                        .catch(e => reject(e))
                }else{
                    reject('notVisibility')
                }
            }
        }
    })
}

module.exports = controller