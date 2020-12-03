require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')

const ordersRouter = require('./routes/orders')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/orders', ordersRouter)

http.listen(process.env.PORT, () => {
    console.log(`escuchando en :${process.env.PORT}`)
})
