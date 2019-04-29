require("dotenv").config();
const express = require("express")
const massive = require("massive")
const session = require("express-session")
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

const app = express()
app.use(express.json())

massive(CONNECTION_STRING)
.then(db => {
    app.set("db", db)
})
.catch(err => {console.log(err)})


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized : false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))


app.listen(SERVER_PORT, () => {
    console.log(`I am listening on ${SERVER_PORT}`)
})