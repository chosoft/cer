const passwordVerification = require('./../../utils/verficadores/passwordVerificator')
const { changePasswordUser } = require('../../model/usersModel')

function controller(id,obj){
    return new Promise(async (resolve,reject) =>{
        try {
            if(Object.keys(obj).length <= 0){
                reject('notObj')
            }else{
                const passResult = await passwordVerification(obj)
                if(passResult.error === ''){
                    const resultModel = await changePasswordUser(id,passResult.password)
                    resolve(resultModel)
                }else{
                    reject(passResult.error)
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller 