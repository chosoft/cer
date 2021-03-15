const passwordVerification = require('./../../utils/verficadores/passwordVerificator')
const { dataUser,changePasswordUser } = require('../../model/usersModel')
function controller(id,obj){
    return new Promise(async (resolve,reject) =>{
        try {
            if(Object.keys(obj).length <= 0){
                reject('notObj')
            }else{
                const userVerfResult = await dataUser(id)
                if(userVerfResult.length >= 3 && Array.isArray(userVerfResult)){
                    const passResult = await passwordVerification(obj)
                    if(passResult.error === ''){
                        const resultModel = await changePasswordUser(id,passResult.password)
                        resolve(resultModel)
                    }
                    reject(passResult.error)
                }else{
                    reject('notUser')
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller 