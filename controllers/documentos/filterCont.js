//Models to retrieve data
const { dataUser } = require('./../../model/usersModel')
const { getDocs } = require('./../../model/documentModel')

//Function controller
function controller(id,group){
    return new Promise(async (resolve, reject) => {
        try {
            const perfilData = await dataUser(id)
            const finalGroup = (group === 'documentos' || group === 'articulos') ? group : 'documentos'
            const docs = await getDocs(finalGroup)
            if(docs.length <= 0){
                resolve({perfilData,docs:'nulos'})
            }else{
                resolve({perfilData,docs:docs.reverse()})
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller