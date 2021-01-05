const { loginUser } = require('./../../model/usersModel')
const { addEntry } = require('./../../model/entryModel')
function loguearse(body,ip){
    return new Promise((resolve, reject) =>{
        try {
            if(Object.keys(body) <= 0 || body === undefined || body === null || body === undefined || body === ''|| body === {}){
                reject('dataNull')
            }else{
                const {correo,password} = body
                if(correo === '' || password === '' || ip === ''){
                    reject('dataNull')
                }else{
                    const lastBody = {
                        correo,
                        password,
                        ip
                    }
                    loginUser(lastBody).then( (data) => {
                        addEntry(data[0],data[1]).then((ok)=> {
                            resolve(ok)
                        }).catch(e => {
                            reject(e)
                        })
                    }).catch(e => {
                        reject(e)
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = loguearse