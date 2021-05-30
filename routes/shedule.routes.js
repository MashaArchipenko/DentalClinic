const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const config = require('config')
const Shedule = require('../models/Shedule')
const Estimate = require('../models/Estimate')
const Card = require('../models/Card')
const Staff = require('../models/Staff')
const Client = require('../models/Client')

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

//check this route
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
        const { date, time,  idStaff } = req.body
        const staff = await Staff.findOne({ _id: idStaff })
        const client = await Client.findOne({userId: req.user.userId})
        const card = new Card(
            {
                userId: client._id, date, doctorName: staff.name
            }
        )
        const estimate = new Estimate({ date })
        await Shedule.updateOne({ date, time, idStaff }, { $set: { idCard: card._id, idEstimate: estimate._id } })
        await estimate.save();
        await card.save();
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
        const shedule = await Shedule.find({/* date: Date.now()*/ idCard: {$ne:null}}).populate('idStaff').populate('idCard')
        res.json(shedule);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//find record in shedule by user id
router.get('/all', auth, async (req, res) => {
    try {
        
        const card = await Card.findOne({ userId: req.user.userId })
        const shedule = await Shedule.find({ /*date: { $gte: Date.now() },*/ idCard: card._id }).populate('idStaff')
       
        res.json(shedule);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const shedule = await Shedule.find({ idStaff: id, idCard: null })
        res.json(shedule)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router