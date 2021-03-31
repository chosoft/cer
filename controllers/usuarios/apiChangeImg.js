const { dataUser,changeImgUser } = require('./../../model/usersModel')
const pathUserImg = 'profileImg/'
//const upload = require('./../../config/imgMulter')
//const fileUp = upload.single('myFiles')
const deleterFile = require('./../../utils/fileManager/deleteDoc')
function controller(id,file){
    return new Promise(async(resolve, reject) => {
        try {

            if(file === 'nulo'){
                reject('fileNull')
            }else{
                let responseData = await dataUser(id)
                const actualImgUser = responseData[2]
                if(actualImgUser === 'profileImg/doe.svg'){
                    const changerImgPlaceResponse = await changeImgUser(id,`${pathUserImg}${file.filename}`)
                    resolve(changerImgPlaceResponse)
                }else{
                    const imgToDelete = actualImgUser.substring(actualImgUser.indexOf('/')+1)
                    const deleterImgResponse = await deleterFile(`${pathUserImg}${imgToDelete}`)
                    const changerImgPlaceResponse = await changeImgUser(id,`${pathUserImg}${file.filename}`)
                    resolve(changerImgPlaceResponse)
                }
            }
        } catch (e) {
            reject(e)
        }
    })

}

module.exports = controller