const qr = require('qrcode')    // An external module used to generate unique QR code.


// Using Asynchronous function to generate QR code along with the URL &
// the QR code will be displayed in the Kiosk.
async function generateQRCode(bookingDetails) {
    try {
        
        const ticketPageUrl = 'https://integrated-ticketing-system.onrender.com/ticket'

        const fullUrl = `${ticketPageUrl}?data=${encodeURIComponent(bookingDetails)}`

        const qrCodeDataUrl = await qr.toDataURL(fullUrl)

        return qrCodeDataUrl

    } catch (error) {
        console.error("Error generating QR code: \n", error)
        throw error
    }
}

module.exports = { generateQRCode }