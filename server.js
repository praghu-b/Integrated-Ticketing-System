const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT || 5500
app.listen(PORT, () => { console.log(`SERVER IS RUNNING ON PORT: ${PORT}`) })