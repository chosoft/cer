function controller(id,obj){
    return new Promise(async (resolve,reject) => {
        try{
            if(Object.entries(obj) <= 0 ){
                reject('notObj')
            }
            

        }catch(e){
            reject(e)
        }
    })
}

module.exports = controller