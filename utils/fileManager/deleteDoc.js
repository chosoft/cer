const fs = require("fs")
const path = require("path")
function deleter(ruta){
    return new Promise((resolve, reject) => {
        if(ruta === null || ruta === undefined || ruta === ''){
            reject('nullRuta')
        }else{
            fs.unlink(path.join(__dirname,'../../public/'+ruta),function(err){
                if(err){
                    reject(err)
                }else{
                    resolve('deleteFile')
                }
            })
        }

    })
}
module.exports = deleter