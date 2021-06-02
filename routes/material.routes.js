const { Router } = require('express')
const router = Router()
const Material = require('../models/Material')

router.post('/newMaterial', async (req, res) => {
    try {
        const { name, count } = req.body
        console.log(name, count);
        const mat = new Material
            (
                {
                    name, count
                }
            )
        await mat.save()
        res.json({ message: 'Save' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/change',async(req,res)=>
{
    try {
        const list = req.body
        const length=Object.keys(list).length
        for(let i=0;i<length;i++)
        {
            let count = parseInt(list[i].count)-1;
          await  Material.updateOne({name:list[i].name},{$set:{count:count}})
        }
        res.status(201).json({message:'Save'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/all', async (req, res) => {
    try {
        const materials = await Material.find({});
        res.status(201).json(materials);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router