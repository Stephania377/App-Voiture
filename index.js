const express = require('express')
require("dotenv").config({ path: "./config/.env" })
// require("./fake")
const bodyParser = require("body-parser")
const userRoutes = require('./routes/userRoutes')
const voitureRoutes = require("./routes/voitureRoutes")
const commentaireRoutes = require("./routes/commentaireRoutes")
const cors = require('cors');
const cookieParse = require("cookie-parser")
const { checkUser, requireAuth } = require("./middleware/authMiddleware")
const app = express()
require('./config/db')

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
app.use(cors(corsOptions));
  

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ path: true }))
app.use(cookieParse())

//middleware
app.use('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

//route
app.use('/api/user', userRoutes)
app.use('/api/comment',requireAuth, commentaireRoutes)
app.use('/api/voiture', voitureRoutes)

app.listen(process.env.PORT, (err) => {
    console.log(`listening on port ${process.env.PORT}`);
});