//Models to retrieve the data
const { dataUser } = require('./../../model/usersModel') 
const { getArticles } = require('./../../model/articlesModel')

function controller(id) {
    return new Promise((resolve, reject) => {
        try{
            if(id === undefined || id === null || id === ''){
                reject('idNull')
            }else{
                dataUser(id) 
                    .then(data => {
                        if(Array.isArray(data) && data.length >= 3){
                            const perfilData = data
                            getArticles().then(articulos => {
                                const dataMock = [perfilData,articulos]
                                resolve(dataMock)
                            }).catch(e => {
                                reject(e)
                            })
                        }else{
                            reject('notUser')
                        }
                    }).catch(err => {
                        reject(err)
                    })
            }
        }catch(err){
            reject(err)
        }
    })
}

module.exports = controller