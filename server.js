const express = require("express");
const cors = require("cors");
require('dotenv').config()


const authRoutes = require('./routes/auth.js')

const port = process.env.PORT || 3000
const app = express()
app.use(express.json());
app.use(express.urlencoded());
app.use( cors() )

app.use( '/auth', authRoutes )

app.listen( port, () => {
    console.log( 'Server is running...' )
    console.log( `Listening on port ${ port }` )
} )


