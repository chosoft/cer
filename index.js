//Modules to initialize
const express = require('express')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const session = require('express-session')
const router = require('./routes/router.js')
const {config} = require('./config/config')
const process = require('process')
const app = express()

//Database initialize
require('./database')
//View Engine 
app.set("views",path.join(__dirname,'views'))
app.set("view engine","pug")
process.setMaxListeners(25)

//Proxy
app.set('trust proxy', true);

//StaticFiles
app.use(express.static(path.join(__dirname,'public')))

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(helmet())
app.use(compression())
app.use(session({
    name: 'SOAP',
    secret: config.adminSecret,
    resave:true,
    saveUninitialized: true,
    maxAge: 900000,
}))

//Disable The x-powered-by Security
app.disable('x-powered-by')

//Router
router(app)

//Running server
const server = app.listen(config.port || process.env.PORT  , () => {
    console.log(`[SERVER] The server is listening on http://localhost:${config.port}`)
    console.log(`[SERVER] The server is running in ${config.env} enviroment`)
})
