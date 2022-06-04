const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")


//middlewares

app.use(cors())
app.use(express.json()) //access to req.body


//controllers
//new
app.use("/flashcards", require("./controllers/flashcards"))


app.listen(8000, () => {
    console.log(`Listening to port 8000`)
})