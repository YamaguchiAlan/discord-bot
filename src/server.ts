import express, {Express} from 'express'
import cors, {CorsOptions} from "cors"

import mainRoutes from '../routes/index.routes'

const app: Express = express()

// Setting
app.set('port', process.env.PORT || 443);

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const corsOpt: CorsOptions = {
    origin: true,
    credentials: true
}
app.use(cors(corsOpt))

// Routes
app.use(mainRoutes);

export default app