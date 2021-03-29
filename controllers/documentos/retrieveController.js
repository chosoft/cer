//Modules 
const { filterDocs } = require('./../../model/documentModel')
//Controller function
function controller(type){
    return new Promise(async (resolve, reject) => {
        try {
           const filterDocsResponse = await filterDocs(type) 
           resolve(filterDocsResponse)
        } catch (e) {
            reject(e)
        }
        /* if(id === undefined || id === null || id === ''){
            reject('null')
        }else{
            dataUser(id).then(dataRender => {
                if(Array.isArray(dataRender) && dataRender.length >= 3 ){
                    filterDocs(type).then(docs => {
                        resolve(docs)
                    }).catch(err =>{
                        reject(err)
                    })
                }else{
                    reject('notUser')
                }
            }).catch(err => reject(err))
        } */
    })
}
module.exports = controller