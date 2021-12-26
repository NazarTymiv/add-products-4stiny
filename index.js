const express = require('express');
const bodyParser = require('body-parser');
const config = require('config')
const mongoose = require('mongoose');
const productsRoutes = require('./routes/products')

const PORT = process.env.PORT || config.get('port')

const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.set('views', 'public')
app.use(express.static('public'))
app.use(productsRoutes)


const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        })
        app.listen(PORT, () => console.log(`Server has been started on ${PORT} port...`))
    } catch (e) {
        console.log(e)
    }
}

start()