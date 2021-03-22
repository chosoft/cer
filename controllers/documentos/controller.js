//Models to retrieve the data
const { dataUser } = require('./../../model/usersModel')
const { getGroups } = require('./../../model/groupModel')

//Controller function
function controller(id){
    return new Promise( async(resolve, reject) => {
        try {
            const perfilData = await dataUser(id)
            const groups = await getGroups()
            if(groups.length <= 0){
                resolve({perfilData,groups:'nulos'})
            }else{
                resolve({perfilData,groups})
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller
