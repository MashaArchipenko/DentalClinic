const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    date: { type: Date, required: true },
    idService: [{ type: Types.ObjectId, ref:'PriceList' }],
    cost: { type: Number },
    lostMaterials: [{ type: Types.ObjectId, ref:'Material'}]
})

module.exports = model('Estimate', schema)