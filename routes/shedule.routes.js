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
        response.status(500).json({ message: e.message})
    }
})

router.get('/all',auth,async(req,res)=>
{
    try {
        const card=await Card.find({userId:req.user.userId})
        const shedule=await Shedule.find({idCard:card._id}).populate('idStaff')
        res.json(shedule);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const shedule = await Shedule.find({ idStaff: req.params.id })
        res.json(shedule)
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
                cardId: card._id,date, time, idEstimate: estimate._id, idStaff: req.params.id
            }
        )
        await shedule.save()
        await estimate.save()
        res.status(201).json({message:'Save'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router