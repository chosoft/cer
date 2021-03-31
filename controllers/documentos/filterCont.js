//Models to retrieve data
const { dataUser } = require('./../../model/usersModel')
const { getDocs } = require('./../../model/documentModel')

//Function controller
function controller(id,group,initialize){
    return new Promise(async (resolve, reject) => {
        try {
            if(initialize){
                const finalGroup = (group === 'documentos' || group === 'articulos') ? group : 'documentos'
                const docs = await getDocs(finalGroup,id)
                const dataPerfil = await dataUser(id)
                if(docs.length <= 0){
                    resolve({docs:'nulos',perfilData:dataPerfil})
                }else{
                    docs.sort((a,b) => {
                        return new Date(b.date) - new Date(a.date)
                    })
                    resolve({docs,perfilData:dataPerfil})
                }
            }else{
                const finalGroup = (group === 'documentos' || group === 'articulos') ? group : 'documentos'
                const docs = await getDocs(finalGroup,id)
                if(docs.length <= 0){
                    resolve('nulos')
                }else{
                    docs.sort((a,b) => {
                        return new Date(b.date) - new Date(a.date)
                    })
                    resolve(docs)
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller