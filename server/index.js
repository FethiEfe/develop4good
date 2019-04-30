require("dotenv").config();
const express = require("express")
const massive = require("massive")
const session = require("express-session")
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const authController = require("./controller/authController")
const editController = require("./controller/editController")

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

app.get("/auth/developers", authController.getAllDevelopers)
app.post("/auth/developers", authController.signupDev)
app.post("/auth/login", authController.login)
app.get("/auth/logout",authController.logout )

app.post("/api/updateprofile", editController.updateMyProfileInfo)


app.listen(SERVER_PORT, () => {
    console.log(`I am listening on ${SERVER_PORT}`)
})