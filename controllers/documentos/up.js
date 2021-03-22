//Models to retrieve data
const { saveDocs } = require('./../../model/documentModel')
//Array verificator
const verificador = require('./../../utils/verficadores/upVerificator')
//Controller function
function controller(id,ip,files,group){
    return new Promise(async (resolve,reject) => {
        try {
            if(files === 'nulos' || files.lenght <= 0 ){
                reject('notUpload')
            }else{
                const data = {
                    owner: id,
                    ip,
                    names: arrayMade(files),
                    rutas: rutasMade(files),
                    types: typesMade(files),
                    visible: visibleArray(files),
                    group
                }
                const verificatorResult = await verificador(data)
                const saveDocsResult = await saveDocs(data)
                if(group === 'articulos'){
                    resolve(data.rutas[0])
                }else{
                    resolve(saveDocsResult)
                }
            }
        } catch (e) {
            reject(e)
        }
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
        }else if(ruteName === 'mp3'|| ruteName === 'ogg' || ruteName === 'avi' || ruteName === 'wm' || ruteName === 'wav' || ruteName === 'midi'){
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