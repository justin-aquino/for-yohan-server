const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")


//middlewares

app.use(cors())
app.use(express.json()) //access to req.body



//ROUTES

app.post("/flashcards", async(req,res) => {
    try {
        console.log(req.body)   
    } catch (error) {
        console.error(error)
    }
})



app.listen(8000, () => {
    console.log(`Listening to port 8000`)
})