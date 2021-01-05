const { saveUser } = require('./../../model/usersModel')
const validador = require('../../utils/verficadores/register')


function registro(body){
    return new Promise((resolve,reject) => {
        try{
            if(body === null || body === undefined || body === ''){
                reject('nulos')
            }else{
                validador(body).then((data)=>{
    
                    saveUser(data).then(resultado => {
                        resolve(resultado)
                    }).catch(e => {
                        reject(e)
                    })
                }).catch(e => {
                    reject(e)
                })
            }
        }catch(e){
            reject(e)
        }
    })

}

module.exports = registro