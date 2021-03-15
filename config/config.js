//Enviroment Variables
require('dotenv').config()

const config = {
    port: process.env.PORT,
    env: process.env.ENV,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    adminSecret: process.env.ADMIN_SECRET
}

module.exports = {config}