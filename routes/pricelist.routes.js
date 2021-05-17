const { Router } = require('express')
const router = Router()
const shortid = require('shortid')
const auth = require('../middleware/auth.middleware')
const config = require('config')

router.post('/',auth, async (req, res) => {
    try {
       

    } catch (e) {
        response.status(500).json({ message: 'smth wrong try again' })
    }
})

module.exports = router