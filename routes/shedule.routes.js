const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const config = require('config')
const Shedule = require('../models/Shedule')
const Estimate = require('../models/Estimate')
const Card = require('../models/Card')

router.post('/', auth, async (req, res) => {
    try {


    } catch (e) {
        response.status(500).json({ message: 'smth wrong try again' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const shedule = await Shedule.find({ idStaff: req.params.id })
        res.json(shedule)
    } catch (error) {
        res.status(500).json({ message: 'smth wrong try again' })
    }
})

routes.post('/appointment/:id', auth, async (req, res) => {
    try {
        const { date, time } = req.body;
        const estimate = new Estimate({ date })
        await estimate.save();
        const card = await Card.find({ userId: req.user.userId })
        const shedule = new Shedule(
            {
                date, time, idStaff: req.params.id, idEstimate: estimate._id, cardId: card._id
            }
        )
        await shedule.save()
        res.status(201).json({message:'Save'})
    } catch (error) {

    }
})

module.exports = router