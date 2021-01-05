function verificador(obj) {
    return new Promise((resolve, reject) => {
        try {
            const { names,rutas } = obj;
            if(names.length === rutas.length){
                resolve('ok')
            }else{  
                reject('errorUp')
            }

        } catch (e) {
            reject(e)
        }

    })

}
module.exports = verificador