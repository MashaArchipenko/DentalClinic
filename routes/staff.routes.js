const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const Staff = require('../models/Staff.js')
const User = require('../models/User.js')

router.post(
    '/registerDoctor',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ], 
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'not correct registr'
                })
            }

            const { email, password, name, info, birthday, adress, staffName, phone } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'this user is exist' })
            }

            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashPassword, role: staffName.toLowerCase() })
            await user.save()
            const stuff = new Staff(
                {
                    userId: user.id, name, info, birthday, adress, staffName, phone
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
        const { staffn } = req.headers;
        console.log(staffn);
        const staffInfo = await Staff.find({ staffName: staffn })
        console.log("staff ", staffInfo)
        res.json(staffInfo);
    } catch (error) {
        res.status(500).json({ message: 'smth wrong try again' })
    }
})

module.exports = router;