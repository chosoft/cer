const Joi = require('joi')

const Schema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(25)
        .required(),
    correo: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .alphanum()
        .min(12)
        .max(30),
    passwordConf: Joi.ref('password')
    
})

function verficar(body){
    return new Promise((resolve,reject) => {
        try {            
            if(body === undefined || body === null || body === ''){
                reject('nulos')
            }else{
                const {username,correo,password,passwordConf} = body
                
                if(username === '' || correo === '' || password === '' || passwordConf === ''){
                    reject('nulos')
                }else{
                    const value = Schema.validate(body)
                    if(value.error === undefined || value.error === ''){
                        const data = {
                            username: body.username,
                            correo: body.correo,
                            password: body.password
                        }
                        resolve(data)
                    }else{
                        reject('badCheck')
                    }
    
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = verficar