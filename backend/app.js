const express = require('express')
const app = express()
require('dotenv').config({ path: './config/.env' })
const path = require('path')
const morgan = require('morgan')
const helmet = require('helmet')
const fs = require('fs')
const cors = require('./config/cors')
const userRoutes = require('./routes/user.routes');
const saucesRoutes = require('./routes/sauce.routes')
const limiter = require('./middleware/limiter')

const logger = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' })

//Connexion à MongoDB via Mongoose
require('./config/db')

//CORS
app.use(cors);

//Helmet
app.use(helmet.permittedCrossDomainPolicies())

//Morgan logger
morgan.token('id', (req) => req.params.id)
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(
  '1-[:date[web]]   2-:remote-addr   3-:id   4-:method   5-:status   6-:url   7-:body',
  { stream: logger }
))

//Requests rate limiter
app.use(limiter)

//Bodyparser
app.use(express.json())

//Visualisation des images
app.use('/images', express.static(path.join(__dirname, 'images')))

//Initialisation des Routes
app.use('/api/auth', userRoutes)
app.use('/api/sauces', saucesRoutes)

//Exporte le module app pour qu'il soit utilisable par server.js
module.exports = app;