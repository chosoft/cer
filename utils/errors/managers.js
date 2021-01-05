const {config} = require('./../../config/config')


function notFound(req,res,next){
    res.render('404')
}
function managerErrorServer(err){
    if(config.env === 'production'){
        console.log('a')
        delete err
        console.log('[SERVER][ERROR-MANAGEMENT] ERROR')
    }else{
        console.log('a')

        console.log(`[SERVER][ERROR-MANAGEMENT] ${err}`)
    }

}
module.exports = {notFound,managerErrorServer}