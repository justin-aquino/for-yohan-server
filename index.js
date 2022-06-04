const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")


//middlewares

app.use(cors())
app.use(express.json()) //access to req.body



//ROUTES
//POST TODO
app.post("/flashcards", async(req,res) => {
    try {
        // console.log(req.body) 
        const { name, imageurl } = req.body  
        const newEntry = await pool.query("INSERT INTO flashcard (name, imageUrl) VALUES($1, $2) RETURNING *", [name, imageurl])
        res.json(newEntry.rows[0])
    } catch (error) {
        console.error(error)
    }
})


//GET ALL CARDS
app.get("/flashcards", async (req, res) => {
    try {
        const allCards = await pool.query("SELECT * FROM flashcard")
        res.json(allCards)
    } catch (error) {
        console.log(error)
    }
})

//GET A SPECIFIC CARD

app.get("/flashcards/:id", async (req,res) => {
    try {
        const { id } = req.params
        const foundCard = await pool.query("SELECT * FROM flashcard WHERE flashcard_id = $1", [id])
        res.json(foundCard)
    } catch (error) {
        console.error(error)
    }
})

//UPDATE A CARD

app.put("/flashcards/:id", async (req,res) => {
    try {
        const { id } = req.params
        const { name, imageurl } = req.body
        const updateCard = await pool.query(
            "UPDATE flashcard SET name = $1, imageurl = $2 WHERE flashcard_id = $3", 
            [name, imageurl, id]
            )
        res.json("entry updated!")

    } catch (error) {
        console.log(error)
    }
})

//DELETE A CARD

app.delete("/flashcards/:id", async (req,res) => {
    try {
        const { id } = req.params
        const cardToDelete = await pool.query("DELETE FROM flashcard WHERE flashcard_id = $1", [id])
        res.json("card was deleted!")
    } catch (error) {
        console.log(error)
    }
})



app.listen(8000, () => {
    console.log(`Listening to port 8000`)
})