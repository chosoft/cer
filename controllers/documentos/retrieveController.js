//Modules 
const { filterDocs } = require('./../../model/documentModel')
//Controller function
function controller(type,id){
    return new Promise(async (resolve, reject) => {
        try {
           const filterDocsResponse = await filterDocs(type,id) 
           resolve(filterDocsResponse)
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = controller