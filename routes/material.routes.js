const { Router } = require('express')
const router = Router()
const Material=require('../models/Material')

router.post('/newMaterial',async(req,res)=>
{
    try {
        const {name, count} = req.body
        const mat= new Material
        {
            name, count
        }
        await mat.save()
        res.status(201).json({message:'Save'})
  
    } catch (error) {
        res.statuc(500).json({message:error.message})
    }
})

router.get('/all',async(req,res)=>
{
    try {
        const materials = await Material.find({});
        res.status(201).json(materials);
    } catch (error) {
        res.statuc(500).json({message:error.message})
    }
})

module.exports = router