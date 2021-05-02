const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User' },
    reviewText: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = model('Review', schema)