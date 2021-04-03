const { getAllActiveUsers } = require('./../../model/usersModel')

function controller(){
    return new Promise(async(resolve, reject) => {
        try {
            const usersResult = await getAllActiveUsers()            
            if(usersResult.length <= 0){
                resolve('nulos')
            }else{
                let finalObj = {}
                let finalData = []
                usersResult.forEach(({img,username,correo},index) => {
                    finalObj = {
                        img,
                        username,
                        correo
                    }
                    finalData.push(finalObj)
                    if(index+1 === usersResult.length){
                        resolve(finalData)
                    }else{

                    }
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller