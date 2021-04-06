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

    })
}

module.exports = controller