const express = require('express')
const router = express()
const verification = require('../controller/verification.controller')


router.post('/', verification)

module.exports = router