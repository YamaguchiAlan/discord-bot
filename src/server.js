const express = require("express")
const cors = require("cors")

const app = express()

// Setting
app.set('port', process.env.PORT || 443);

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true
}))

// Routes
app.use(require('../routes/index.routes'));

module.exports = app