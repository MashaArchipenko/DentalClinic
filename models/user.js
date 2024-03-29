const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, required: true },
    links: [{ type: Types.ObjectId, ref: 'Link' }]
})

module.exports = model('User', schema)