const { changeVisibility } = require('./../../model/articlesModel')
function controller(keyChange,visibility) {
    return new Promise(async(resolve, reject) => {
        try {
            if(keyChange === 'nulo'){
                reject('notChangeKey')
            }else{
                const changeVisibilityResponse = await changeVisibility(keyChange,visibility)
                resolve(changeVisibilityResponse)
            }
        } catch (e) {
            reject(e)
        }
/*         if(id === undefined || id === null || id === ''){
            reject('notUser')
        }else{
            if(keyChange === '' || keyChange === undefined || keyChange === null){
                reject('notKey')
            }else{
                if(typeof visibility === 'boolean'){
                    dataUser(id)
                        .then(dataRender => {
                            if(Array.isArray(dataRender) && dataRender.length >=3){
                                changeVisibility(keyChange,visibility)
                                    .then(ok => resolve(ok))
                                    .catch(e => reject(e))
                            }else{
                                reject('notUser')
                            }
                        })
                        .catch(e => reject(e))
                }else{
                    reject('notVisibility')
                }
            }
        } */
    })
}

module.exports = controller