const express = require('express')
const app = express()

const verifyID = require('./routes/verification')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use('/',express.static(__dirname + '/public'))
app.use('/node_modules', express.static('node_modules'))
app.set('views',__dirname + '/views')

app.use('/verify', verifyID)

app.get('/', (req, res) => { res.render("index")})

module.exports = app