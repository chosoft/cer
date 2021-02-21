const Joi = require('joi');

const Schema = Joi.object({
    passwordOne: Joi.string()
        .min(12)
        .alphanum()
        .max(30),
    passwordTwo: Joi.ref('passwordOne') 
})

function validate(obj){
    return new Promise(async(resolve, reject) => {
        try {
            const valueSchema =  Schema.validate(obj)
            if(valueSchema.error === undefined || valueSchema.error === ''){
                resolve({password:obj.passwordOne})
            }
            reject(valueSchema.error)
        } catch (e) {
            reject(e)            
        }
    })
}