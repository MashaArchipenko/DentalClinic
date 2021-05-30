const { Router } = require('express')
const router = Router()
const shortid = require('shortid')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const Estimate = require('../models/Estimate')

router.post('/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const {}
    } catch (e) {
        response.status(500).json({ message: 'smth wrong try again' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const estimate = await Estimate.findOne({ _id })
        res.json(estimate)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router