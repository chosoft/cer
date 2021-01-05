const { dataUser } = require('./../../model/usersModel')
const { deleteDoc } = require('./../../model/documentModel')

const deleter = require('../../utils/fileManager/deleteDoc')
function controller(id,key){
    return new Promise((resolve, reject) => {
        if(id === undefined || id === null || key === undefined || key === null || id ==='' || key ===''){
            reject('nullFields')
        }else{
            dataUser(id).then(dataRender => {
                if(Array.isArray(dataRender) && dataRender.length >= 3){
                    deleteDoc(key).then(routeDelete=> {
                        deleter(routeDelete).then(ok => {
                            resolve(ok)
                        }).catch(e => {
                            reject(e)
                        })
                    }).catch(err => reject(err))
                }else{
                    reject('notUser')
                }

            }).catch(e => {
                reject(e)
            })
        }
    })
}
module.exports = controller