const { getDataById } = require('../service/db.service')
const { getDistanceTime } = require('../service/distance.service')

module.exports = async (req, res) => {
    console.log("USER INPUTS:\n", req.body)
    try{
        const data = {
            id: req.body.id,
            origin: req.body.from,
            destination: req.body.to
        }

        console.log("OBJECT DATA:\n", data)

        const userDetails = await getDataById(data.id)
        console.log("USER DETAILS:\n", userDetails)
        const distanceTime = await getDistanceTime([data.origin], [data.destination])
        console.log("DISTANCE & TIME:\n", distanceTime)
        const distance = distanceTime.distance
        const duration = distanceTime.duration
        
        console.log(`Distance between ${data.origin} and ${data.destination} is ${distance} along with duration of ${duration}`)
        res.render('success')
    } catch(err) {
        res.status(500)
    }
}