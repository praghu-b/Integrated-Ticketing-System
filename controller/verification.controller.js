const { getDataById, deductMoney, saveBooking } = require('../service/db.service')
const { getDistanceTime } = require('../service/distance.service')
const { sendTicket } = require('../service/mail.service')
const { generateQRCode } = require('../service/qrcode.service')


module.exports = async (req, res) => {
    console.log("USER INPUTS:\n", req.body)
    try{

        // USER INPUT DATA
        const data = {
            id: req.body.id,
            origin: req.body.from,
            destination: req.body.to
        }
        console.log("USER INPUT DATA:\n", data)


        // GENERATING BOOKING ID & CREATING TIMESTAMP
        const bookID = Math.floor((Math.random() * 1000000) + 1)


        // VALIDATING USER
        const userDetails = await getDataById(data.id)
        console.log("USER DETAILS:\n", userDetails)


        // GETTING DISTANCE & DURATION OF JOURNEY USING GOOGLE DISTANCE API
        const distanceTime = await getDistanceTime([data.origin], [data.destination])
        console.log("DISTANCE & TIME:\n", distanceTime)
        const distance = distanceTime.distance
        const duration = distanceTime.duration


        // PROCESSING PAYMENT - DEDUCTING PRICE IN BALANCE KEY
        const price = 1.25 * distance
        const currentBalance = await deductMoney(data.id, price)
        console.log(`CURRENT BALANCE: ${currentBalance}`)


        // BOOKING DATA
        var bookingDetails = {
            bookID: bookID,
            email: userDetails.mail,
            balance: currentBalance,
            phone: userDetails.phone,
            name: userDetails.name,
            id: userDetails.id,
            origin: data.origin,
            destination: data.destination,
            price: price,
            distance: distance,
            duration: duration,
            date: (new Date().toLocaleString())
        }
        console.log("BOOKING DETAILS:\n", bookingDetails)


        // SENDING E-TICKET VIA GMAIL
        const eTicket = await sendTicket(bookingDetails)


        // GENERATING QR CODE
        const qrCodeDataUrl = await generateQRCode(bookingDetails)


        // SAVING BOOKING HISTORY
        try {
            saveBooking(bookingDetails)
        } catch (error) {
            console.log(error);
        }


        // RENDERING BOOKING SUCCESS PAGE
        res.render('success', { email: userDetails.mail, qrCodeDataUrl})
    } catch(err) {
        res.status(500)
    }
}