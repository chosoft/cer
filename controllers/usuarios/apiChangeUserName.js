const { dataUser,changeUserName } = require('./../../model/usersModel')
function controller(id,username){
    return new Promise((resolve,reject) => {
        dataUser(id)
            .then(dataRender => {
                if(Array.isArray(dataRender) && dataRender.length >= 3){
                    changeUserName(id,username)
                        .then(ok => resolve(ok))
                        .catch(e => reject(e))
                }else{
                    reject('notUser')
                }
            })
    })
}

module.exports = controller