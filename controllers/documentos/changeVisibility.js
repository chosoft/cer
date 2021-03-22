const { changeVisibility } = require('./../../model/documentModel')
function controller(id,keyMongo,visibility){
    return new Promise(async (resolve, reject) => {
        try {
           if(keyMongo === 'nulo') {
                reject('keyChangerNull')
           }else{
                const changeVisibilityResponse = await changeVisibility(keyMongo,visibility)
                resolve(changeVisibilityResponse)
           }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller