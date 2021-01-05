//Models to retrieve the data
const { dataUser } = require('./../../model/usersModel')
const { getGroups } = require('./../../model/groupModel')

//Controller function
function controller(id){
    return new Promise((resolve, reject) => {
        if(id === null || id === undefined || id === null){
            reject('error')
        }else{
            dataUser(id).then(data=>{
                if(Array.isArray(data) && data.length >= 3 ){
                    const perfilData = data
                    getGroups().then(docs => {
                        if(docs.length <= 0){
                            const finalData = [perfilData,'null']
                            resolve(finalData)

                        }else{
                            const finalData = [perfilData,docs]
                            resolve(finalData)
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
    })
}

module.exports = controller
