const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const Client = require('../models/Client')

router.post('/addInfo', auth, async (req, res) => {
    try {
        const { name, adress, phone, byrthday } = req.body;
        const checkClient = await Client.find({ userId: req.user.userId })
        if (checkClient) await Client.updateOne({ userId: req.user.userId }, { $set: { name, adress, phone, byrthday } });

        else {
            const info = new Client(
                {
                    name, adress, phone, byrthday, userId: req.user.userId
                }
            )
            await info.save()
            res.status(201).json({ info })
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