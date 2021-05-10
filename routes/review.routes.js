const { Router } = require('express')
const router = Router()
const shortid = require('shortid')
const Review = require('../models/Review.js')
const auth = require('../middleware/auth.middleware')
const config = require('config')

router.post('/createReview', auth, async (req, res) => {
    try {
        console.log("req.body: ",req.body)
        const { reviewText } = req.body
        const review = new Review(
            {
                reviewText, userId: req.user.userId
            }
        )
        await review.save()
        res.status(201).json({ review })

    } catch (e) {
        response.status(500).json({ message: 'smth wrong try again' })
    }
})

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find({})
        res.json(reviews);
        console.log("reviews: ",reviews)
    } catch (e) {
        response.status(500).json({ message: 'smth wrong try again' })
    }
})

router.get(':/id', auth, async (req, res) => {
    try {
        console(req.params);
        const reviews = await Review.find({ userId: req.params.id });
    } catch (e) {
        response.status(500).json({ message: 'smth wrong try again' })
    }
})

module.exports = router