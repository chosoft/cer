//Models to retrieve data
const { dataUser } = require('./../../model/usersModel')
const { getDocs } = require('./../../model/documentModel')

//Function controller
function controller(idUser,q){
    return new Promise((resolve, reject) => {
        try {
            if(idUser === undefined || idUser === null || idUser === ''){
                reject('userNull')
            }else{
                if(q === undefined || q === null || q === ''){
                    reject('groupNull')
                }else{
                    dataUser(idUser).then(dataRender => {
                        if(Array.isArray(dataRender) && dataRender.length >=3 ){
                            const perfilData = dataRender
                            getDocs(q).then(docs => {
                                if(docs.length <= 0 || docs === undefined || docs === null ||docs === ''){
                                    const dataFinal = [perfilData,'nulos']
                                    resolve(dataFinal)
                                }else{
                                    const dataFinal = [perfilData,docs]
                                    resolve(dataFinal)
                                }
                            }).catch(e => {
                                reject(e)
                            })
                        }else{
                            reject('notUser')
                        }
                    }).catch(e => {
                        reject(e)
                    })
                }
            }
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = controller