//Config multer img
//Modules
const multer = require('multer')
const path = require('path')

//Needs
let admitedExtension = ['zip','ogg','pdf','rtf','rar','txt','mp3','avi','wm','wmv','mpg','mpeg','wav','midi','mp4','pptx','pptm','potm','ppam','ppsx','sldm','thmx','sldx','ppsm','potx','xlsx','xlsm','xltx','xltm','xlsb','xlam','doc','docx','docm','dotx','dotm','jpg','png','gif','tiff','svg','bmp','eps','jpeg','jfif']

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, path.join(__dirname, '../public/up'))
    },
    filename: (req,file,cb) => {
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'))
        const realName = file.originalname.substring(0,file.originalname.lastIndexOf('.'))
        const id = req.session.idUserLog
        cb(null, `${id}-${realName}-${Date.now()}${extension}`)
    },
    size: 20971520
})

const upload = multer({storage,
    fileFilter: (req,file,cb) => {
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
    }
})

module.exports = upload