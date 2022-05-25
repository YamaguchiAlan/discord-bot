import 'dotenv/config'
import { botLogin } from './bot'
import connectDb from './database'
import app from './server'

botLogin()
connectDb()

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`)
})
