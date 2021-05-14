const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const Staff = require('../models/Staff.js')
const User = require('../models/User.js')

router.post('/registerDoctor', async (req, res) => {
    try {
        const { email, password, name, info, birthday, adress, staffName } = req.body

        const hashPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashPassword, role: staffName.toLowerCase() })
        await user.save()
        const stuff = new Staff(
            {
                userId: user.id, name, info, birthday, adress, staffName
            }
        )
        await stuff.save()
        res.status(201).json({ message: "staff saved" })
    } catch (e) {
        res.status(500).json({ message: 'smth wrong try again' })
    }
})

router.get('/', async (req, res) => {
    try {
        const {staffn}  = req.headers;
        console.log(staffn);
        const staffInfo = await Staff.find({ staffName: staffn })
        console.log("staff ",staffInfo)
        res.json(staffInfo);
    } catch (error) {
        res.status(500).json({ message: 'smth wrong try again' })
    }
})

module.exports = router;