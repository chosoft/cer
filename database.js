//Modules 
const mongoose = require('mongoose')
const {config} = require('./config/config')
//Options to connect to Mongo

const OPTIONS = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}

//URI MONGO
const URI = `mongodb+srv://${config.dbUser}:${config.dbPass}@${config.dbHost}${config.dbName}?retryWrites=true&w=majority`


mongoose.connect(URI,OPTIONS,(err) =>{
    if(err){
        if(config.env === 'development'){
            console.log(`[SERVER][DATABASE] ERROR TO CONNECT DATABASE ==> ${err.message}`)
        }else{
            delete err
            console.log(`[SERVER][DATABASE] ERROR TO CONNECT DATABASE`)
        }
    }else{
        console.log('[SERVER][DATABASE] DATABASE CONNECT SUCCESFULL')
    }
})

//Connection State
const { connection } = mongoose

connection.on('error',(err)=>{
    const errorMessage = err.message || 'DEFAULT ERROR'
    if(config.env === 'development'){
        console.log(`[SERVER][DATABASE] A ERROR HAS BEEN TO CONNECT TO DATABASE ==> ${errorMessage}`)
    }else{
        delete err
        console.log(`[SERVER][DATABASE] A ERROR HAS BEEN TO CONNECT TO DATABASE`)
    }
})

connection.on('disconnected', () => {
    console.log(`[SERVER][DATABASE] WE LOST THE CONNECTION TO DATABASE`)
})