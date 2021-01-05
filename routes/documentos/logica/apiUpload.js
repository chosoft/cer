//Modules
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const verify = require('./../../../controllers/documentos/idVerify')
//Controllers
const controller = require('./../../../controllers/documentos/up')
//Functions to Manager
const errorManager = require('./../../../utils/errors/typeError')
//Config to error handler
const arrayError = ['errorUp','notUser','null','errorUpload']
//Config Multer
let admitedExtension = ['zip','pdf','rtf','rar','txt','mp3','avi','wm','wmv','mpg','mpeg','wav','midi','mp4','pptx','pptm','potm','ppam','ppsx','sldm','thmx','sldx','ppsm','potx','xlsx','xlsm','xltx','xltm','xlsb','xlam','doc','docx','docm','dotx','dotm','jpg','png','gif','tiff','svg','bmp','eps','jpeg','jfif']
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        //Destination of the upload files
        if(req.session.idUserLog === null || req.session.idUserLog === undefined){
            cb(null,path.join(__dirname, '../../../public/tmp'))
        }else{
            cb(null, path.join(__dirname, '../../../public/up'))
        }
    },
    filename: function (req,file,cb){
        //Changing the name of the file
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'))
        const realName = file.originalname.substring(0,file.originalname.lastIndexOf('.'))
        const id = req.session.idUserLog
        cb(null, `${id}-${realName}-${Date.now()}${extension}`)
    },
    //Max size
    size: 20971520,
})
const upload = multer({storage,
    //Filter the files with the array of accept extensions
    fileFilter: function (req,file,cb){
        const id = req.session.idUserLog
        if(id === undefined || id === null){
            cb(null,false)
        }else{
            verify(id).then(ok => {
                let admited = []
                for (let a = 0; a < admitedExtension.length; a++) {
                    if(path.extname(file.originalname) === '.'+admitedExtension[a]){
                        admited.push(true)
                        break
                    }else{

                    }
                }
                if(admited.length >= 1){
                    cb(null,true)
                }else{
                    cb(null,false)
                }
            }).catch(e => {
                cb(null,false)
            })
        }
}})
//Function from multer to upload the files 
const cpUp = upload.array('myFiles',15)

//Routes and his methods
router.post('/',(req,res,next) => {
    cpUp(req,res, function(err){
        const group = (req.header('svType') === 'blog') ? 'articulos' : 'documentos'
        if(err){
            delete err
            res.send('errorUpload')
        }else{
            if(req.session.idUserLog === null || req.session.idUserLog === undefined){
                res.send('badLogin')
            }else{
                if(Object.keys(req.files).length === 0){
                    res.send('notUpload')
                }else{
                    //Data of the upload files
                    const data = {
                        owner: req.session.idUserLog,
                        ip: req.ip,
                        names: arrayMade(req.files),
                        rutas: rutasMade(req.files),
                        types: typesMade(req.files),
                        visible: visibleArray(req.files),
                        group
                    }
                    controller(req.session.idUserLog,data).then(ok => {
                        if(group === 'articulos'){
                            res.send(data.rutas[0])
                        }else{
                            res.send('ok')
                        }
                    }).catch(e => {
                        const errorLog = errorManager(e,arrayError)
                        delete e
                        res.send(errorLog)
                    })
                }
            }
        }
    })
})
//Functions to fill the files data
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

module.exports = router