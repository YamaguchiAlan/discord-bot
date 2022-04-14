require('dotenv').config()
import {botLogin} from './bot'
import app from './server'

botLogin()
require('./database')

app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get('port')}`);
})