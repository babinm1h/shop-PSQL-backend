require("dotenv").config()
const express = require('express')
const cors = require("cors")
const sequelize = require("./db")
const models = require("./models/models")

const PORT = process.env.PORT || 7777
const app = express()


app.use(express.json())
app.use(cors({ origin: "http://localhost:3000/", credentials: true }))



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(PORT + "started"))
    } catch (err) {
        console.log(err);
    }
}
start()