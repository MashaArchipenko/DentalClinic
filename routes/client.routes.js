const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const Client = require('../models/Client')
const Card = require('../models/Card')

router.post('/addInfo', auth, async (req, res) => {
    try {
        const { name, adress, phone, byrthday } = req.body;
        const checkClient = await Client.findOne({ userId: req.user.userId })
        if (checkClient) {
            await Client.updateOne({ userId: req.user.userId }, { $set: { name, adress, phone, byrthday } });
        }
        else {
            const info = new Client(
                {
                    userId: req.user.userId, name, adress, phone, byrthday
                }
            )
            await info.save()
        }
        const searchCard = await Card.find({ userId: req.user.userId })
        if (!searchCard) {
            const card = new Card({ userId: req.user.userId, date: null, doctorName: null, complaints: null, treatment: null })
            await card.save()
        }
        res.status(201).json({ message: 'Ok' })
    } catch (e) {
        res.status(500).json({ message: 'smth wrong try again' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const info = await Client.find({ userId: req.params.id });
        res.json(info);
    } catch (error) {
        res.status(500).json({ message: 'smth wrong try again' })
    }
})

module.exports = router