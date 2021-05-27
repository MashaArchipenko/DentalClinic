const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const config = require('config')
const Shedule = require('../models/Shedule')
const Estimate = require('../models/Estimate')
const Card = require('../models/Card')
const Staff=require('../models/Staff')

router.post('/', auth, async (req, res) => {
    try {


    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

function parseTime(t) {
    let d = new Date();
    console.log(t);
    let time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    console.log(time);
    d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    d.setMinutes(parseInt(time[2]) || 0);
    return d;
}

router.post('/workShedule', auth, async (req, res) => {
    try {
        const { staffId, date, startTime, endTime } = req.body;
        let startTime2 = parseTime(startTime)
        let endTime2 = parseTime(endTime)
        console.log(startTime2.getHours() < endTime2.getHours())
        while (startTime2 < endTime2) {
            const name = new Shedule(
                {
                    idStaff: staffId, date, time: startTime2.toLocaleTimeString()
                }
            )
            await name.save();
            startTime2.setHours(startTime2.getHours() + 1);
        }
        res.status(201).json({ message: 'Save' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/appointment/:id', auth, async (req, res) => {
    try {
        const { date, time } = req.body;
        const estimate = new Estimate({ date })
        const card = await Card.findOne({ userId: req.user.userId })
        const shedule = new Shedule(
            {
                cardId: card._id, date, time, idEstimate: estimate._id, idStaff: req.params.id
            }
        )
        await shedule.save()
        await estimate.save()
        res.status(201).json({ message: 'Save' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/appointment', auth, async (req, res) => {
    try {
        const { idCard, date, time, idEstimate, idStaff } = req.body
        const card = await Card.findOne({ userId: req.user.userId })
        const estimate = new Estimate({ date })
        await Shedule.updateOne({ date, time, idStaff }, { $set: { idCard: card._id, idEstimate: estimate._id } })
        await estimate.save();
        res.status(201).json({ message: 'Save' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/forWorkDay', async (req, res) => {
    try {
        const shedule = await Shedule.find({ date: { $gte: Date.now() } }).populate('idStaff')
        res.json(shedule)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//find record in this day (for nurce)
router.get('/activeRecord', async (req, res) => {
    try {
        const shedule = await Shedule.find({ /*date: Date.now()*/ }).populate('idStaff')
        res.json(shedule);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//find record in shedule by user id
router.get('/all', auth, async (req, res) => {
    try {
        const card = await Card.find({ userId: req.user.userId })
        const shedule = await Shedule.find({ idCard: card._id }).populate('idStaff')
        res.json(shedule);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        console.log(req.params.id)
        const id = req.params.id;
        const shedule = await Shedule.find({ idStaff:id,idCard:null })
        console.log(shedule)
        res.json(shedule)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router