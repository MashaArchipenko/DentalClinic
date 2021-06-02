const { Router } = require('express')
const router = Router()
const shortid = require('shortid')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const Estimate = require('../models/Estimate')
const Price=require('../models/PriceList')
const { Mongoose } = require('mongoose')

router.post('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const list = req.body
        const length=Object.keys(list).length
        var priceList=[]
        var materials=[]
        for(let i=0;i<length;i++)
        {
            const price = await Price.findOne({_id:list[i]._id})
            if(price) priceList.push(list[i]);
            else materials.push(list[i])
        }
        console.log(_id)
        await Estimate.updateOne({_id},{$set:{idService:priceList,lostMaterials:materials}})
        res.status(201).json({message:'Save'})
    } catch (e) {
        res.status(500).json({ message: e.message })
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

router.get('/',async(req,res)=>
{
    try {
        const estimate = await Estimate.find({}).populate('idService').populate('lostMaterials');
        res.status(201).json(estimate)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router