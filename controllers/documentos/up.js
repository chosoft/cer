//Models to retrieve data
const { dataUser } = require('./../../model/usersModel')
const { saveDocs } = require('./../../model/documentModel')
//Array verificator
const verificador = require('./../../utils/verficadores/upVerificator')
//Controller function
function controller(id,obj){
    return new Promise((resolve,reject) => {
        dataUser(id).then(dataRender => {
            if(Array.isArray(dataRender) && dataRender.length >= 3){
                verificador(obj).then( ok => {
                    saveDocs(obj).then((ok) =>{
                        resolve(ok)
                    }).catch(e => {
                        reject(e)
                    })
                }).catch(e => {
                    reject(e)
                })
            }else{
                reject('notUser')
            }
        }).catch(e => {
            reject(e)
        })
    })
}

module.exports = controller