const { Router } = require('express')
const router = Router()
const Price=require('../models/PriceList')

router.post('/', async (req, res) => {
    try {
        const {nameService, coust} = req.body
        const price= new Price
        {
            nameService, coust
        }
        await price.save()
        res.status(201).json({message:'Save'})
    } catch (e) {
        res.status(500).json({ message: 'smth wrong try again' })
    }
})

router.get('/all',async(req,res)=>
{
    try {
        const price=await Price.find({});
        res.json(price);
    } catch (error) {
        res.status(500).json({ message: 'smth wrong try again' })
    }
})

module.exports = router