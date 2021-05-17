const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    date: { type: Date, required: true },
    idService: [{ type: Types.ObjectId, ref:'PriceList' }],
    cost: { type: Number },
    lostMaterials: [{
        idMaterial: { type: Types.ObjectId, ref: 'Materials' },
        count: { type: Number, default: 0 }
    }]
})

module.exports = model('Estimate', schema)