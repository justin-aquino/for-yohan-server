require("dotenv").config()
const express = require("express")
const router = express.Router()
const pool = require("../db")

//ROUTES
//POST TODO
router.post("/", async(req,res) => {
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
router.get("/", async (req, res) => {
    try {
        const allCards = await pool.query("SELECT * FROM flashcard")
        res.json(allCards)
    } catch (error) {
        console.log(error)
    }
})

//GET A SPECIFIC CARD

router.get("/:id", async (req,res) => {
    try {
        const { id } = req.params
        const foundCard = await pool.query("SELECT * FROM flashcard WHERE flashcard_id = $1", [id])
        res.json(foundCard)
    } catch (error) {
        console.error(error)
    }
})

//UPDATE A CARD

router.put("/:id", async (req,res) => {
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

router.delete("/:id", async (req,res) => {
    try {
        const { id } = req.params
        const cardToDelete = await pool.query("DELETE FROM flashcard WHERE flashcard_id = $1", [id])
        res.json("card was deleted!")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router