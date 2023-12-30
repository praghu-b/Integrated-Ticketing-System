const express = require('express')
const router = express.Router()
const { getDataById } = require('../service/db.service')

router.post('/',async (req, res) => {
    console.log("REQ BODY:")
    console.log(req.body)
    try{
        let id = req.body.id
        const userDetails = await getDataById(id)

        
        res.render('success')
    } catch(err) {
        res.status(500)
    }
})

module.exports = router