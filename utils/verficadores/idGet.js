const {config} = require('../../config/config')
const {managerErrorServer} = require('../../utils/errors/managers')
function idValidator(id){
    return new Promise((resolve, reject) => {
        try {
            if(id === undefined || id === null || id === ''){
                reject('idNull')
            }else{
                   
            }
        } catch (err) {
            if(config.env === 'development'){
                managerErrorServer(err)
                reject(err)
            }else{
                delete e 
                managerErrorServer(err)
                reject(err)
            }
        }
    })
}