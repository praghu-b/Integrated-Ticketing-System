const express = require('express')
const app = express()

const verifyID = require('./routes/verification')

app.use('/verifyid', verifyID)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use('/',express.static('public'))
app.use('/node_modules', express.static('node_modules'))
app.set('views','views')

app.get('/', (req, res) => { res.render("index")})
app.get('/seat', (req, res) => { res.render("seat")})

module.exports = app