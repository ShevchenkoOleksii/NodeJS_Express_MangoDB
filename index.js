const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect('mongodb+srv://Oleksii:1Cdn0Sw8j0aTJ3lB@cluster0.43our.mongodb.net/todos', { autoIndex: false })

        // await mongoose.connect('mongodb+srv://Oleksii:1Cdn0Sw8j0aTJ3lB@cluster0.43our.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        app.listen(PORT, () => {
            console.log(`Server has been started...`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
    .then((req, res) => {
        console.log(req)
        console.log(res)
    })
    .catch((error) => {
        console.log(error)
    })



