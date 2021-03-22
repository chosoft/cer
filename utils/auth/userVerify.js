const { dataUser } = require('./../../model/usersModel')

async function verifyUserId(req,res,next){
    try {
        let contentType = req.get('content-type') ? req.get('content-type').substring(0,req.get('content-type').indexOf(';')) : 'html' // get content type
        const id = req.session.idUserLog ? req.session.idUserLog : 'nulo' //get session id
        if(id === 'nulo'){ //verify the session id 
            if(contentType === 'html'){
                res.redirect('/loguearse')
            }else{
                res.send('idNull')
            }
        }else{ 
            const checkerUser = await dataUser(id) //consulting the id in db
            if(Array.isArray(checkerUser) && checkerUser.length >= 3){
                next()
            }else{
                if(contentType === 'html'){
                    res.redirect('/loguearse')
                }else{
                    res.send('idInvalid')
                }
            }
        }
    } catch (e) {
        res.render('error',{code:500})
    }
}

module.exports = verifyUserId