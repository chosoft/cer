const { changeUserName } = require('./../../model/usersModel')
function controller(id,username){
    return new Promise(async (resolve,reject) => {
        try {
            const changeUserNameResponse = await changeUserName(id,username)
            resolve(changeUserNameResponse)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller