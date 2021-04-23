const { Router, response } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt=require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

//api/auth/reg
router.post(
    '/register',
    [
        check('email', 'not correct email').isEmail(),
        check('password', 'not correct password').isLength({ min: 6 })
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

            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'this user is exist' })
            }

            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashPassword })

            await user.save()
            res.status(201).json({ message: 'User save' })

        } catch (e) {
            response.status(500).json({ message: 'smth wrong try again' })
        }

    })

router.post('/login',
[
    check('email', 'Enter correc Email').normalizeEmail().isEmail(),
    check('password', 'enter password').exist()
],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'not correct signin'
                })
            }

            const {email,password} = req.body
            const user = await User.findOne({email})

            if(!user)
            {
                return res.status(400).json({message:'user not exist'})
            }

            const isMatch =await bcrypt.compare(password,user.password)
            if(!isMatch)
            {
                return res.status(400).json({message:'not correct password'})
            }

            const token=jwt.sign(
                { userId:user.id},
                config.get('jwtSecret'),
                {expiresIn:'1h'}
            )
            res.json({token,userId:user.id})

        } catch (e) {
            response.status(500).json({ message: 'smth wrong try again' })
        }
    })

module.exports = router;