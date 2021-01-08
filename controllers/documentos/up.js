//Models to retrieve data
const { dataUser } = require('./../../model/usersModel')
const { saveDocs } = require('./../../model/documentModel')

//Multer module
const upload = require('./../../config/multer')
const fileUp = upload.array('myFiles',15)

//Array verificator
const verificador = require('./../../utils/verficadores/upVerificator')
//Controller function
function controller(id,ip,req,res){
    return new Promise((resolve,reject) => {
        dataUser(id).then(dataRender => {
            if(Array.isArray(dataRender) && dataRender.length >= 3){
                fileUp(req,res,(err)=>{
                    if(err){
                        reject(err)
                    }else{
                        if(req.files === undefined || Object.keys(req.files).length <= 0 ){
                            reject('notUpload')
                        }else{
                            const group = (req.header('svType') === 'blog') ? 'articulos' : 'documentos'
                            const data = {
                                owner:id,
                                ip,
                                names: arrayMade(req.files),
                                rutas: rutasMade(req.files),
                                types: typesMade(req.files),
                                visible: visibleArray(req.files),
                                group
                            }
                            verificador(data)
                                .then(ok => {
                                    saveDocs(data)
                                        .then(ok => {
                                            if(group === 'articulos'){
                                                resolve(data.rutas[0])
                                            }else{
                                                resolve(ok)
                                            }
                                        })
                                        .catch(e => reject(e))
                                }).catch(e => reject(e))
                        }
                    }
                })
            }else{
                reject('notUser')
            }
        }).catch(e => {
            reject(e)
        })
    })
}


function rutasMade(files){
    let arrayRutas = []
    let replaceName
    let ruteName
    files.forEach(file => {
        replaceName = file.filename.replace(String.fromCharCode(92),'/')
        ruteName = replaceName.substring(replaceName.lastIndexOf('/')+1)
        arrayRutas.push('up/'+ruteName)
    })

    return arrayRutas
}
function typesMade(files){
    let arrayTypes = []
    let nameFile
    let ruteName
    files.forEach(file => {
        nameFile = file.filename
        ruteName = nameFile.substring(nameFile.lastIndexOf('.')+1)
        if(ruteName === 'doc' || ruteName === 'docx' || ruteName === 'rtf' || ruteName==='dotm' || ruteName === 'docm'){
            
            arrayTypes.push('word')

        }else if(ruteName === 'pptx' || ruteName === 'pptm' || ruteName === 'potm' || ruteName==='ppam' || ruteName === 'ppsx' || ruteName === 'sldm' || ruteName === 'thmx' || ruteName === 'sldx' || ruteName === 'ppsm' || ruteName === 'potx'){
            
            arrayTypes.push('powerpoint');

        }else if(ruteName === 'xlsx' || ruteName === 'xlsm' || ruteName === 'xltx' || ruteName === 'xltm' || ruteName === 'xlsb' || ruteName=== 'xlam'){
            arrayTypes.push('excel')
        }else if(ruteName === 'jpg' || ruteName === 'png' || ruteName === 'gif' || ruteName === 'tiff' || ruteName === 'svg' || ruteName === 'bmp' || ruteName === 'eps' || ruteName === 'jpeg' || ruteName === 'jfif'){
            arrayTypes.push('image')
        }else  if(ruteName === 'zip' || ruteName === 'rar'){
            arrayTypes.push('comp')
        }else if(ruteName === 'pdf'){
            arrayTypes.push('pdf')
        }else if(ruteName === 'txt'){
            arrayTypes.push('text')
        }else if(ruteName === 'mp3' || ruteName === 'avi' || ruteName === 'wm' || ruteName === 'wav' || ruteName === 'midi'){
            arrayTypes.push('audio')
        }else if(ruteName === 'mp4' || ruteName === 'wmv' || ruteName === 'mpg' || ruteName=== 'mpeg'){
            arrayTypes.push('vid')
        }else{
            arrayTypes.push('file')
        }
    })

    return arrayTypes
}
function arrayMade(files){
    let arrayNames = []

    files.forEach(file => {
        arrayNames.push(file.originalname)
    })

    return arrayNames
}
function visibleArray(files){
    let arr = []

    files.forEach(file => {
        arr.push(false)
    })

    return arr
}
module.exports = controller