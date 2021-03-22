const { deleteDoc } = require('./../../model/documentModel')

const deleter = require('../../utils/fileManager/deleteDoc')
function controller(key){
    return new Promise(async(resolve, reject) => {
        try {
            if(key === 'nulo'){
                reject('keyNull')
            }else{
                const deleteDocDbResponse = await deleteDoc(key)
                const deleteDocFromFsResponse = await deleter(deleteDocDbResponse)
                resolve(deleteDocFromFsResponse)
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = controller