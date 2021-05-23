const { Router } = require('express')
const router = Router()
const shortid = require('shortid')
const auth = require('../middleware/auth.middleware')
const Card = require('../models/Card')
const config = require('config')

//add info to card
router.post('/', auth, async (req, res) => {
    try {
        const {date, doctorName, complaints, treatment,userId} = req.body
        const check = await Card.updateOne({userId},{$set:{date, doctorName, complaints, treatment}})
        res.json(check);
    } catch (e) {
        res.status(500).json({ message: error.message })
    }
})

//router for client(client can read his card)
router.get('/', auth, async (req, res) => {
    try {
        const card = await Card.find({ userId: req.user.userId })
        res.json(card);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router