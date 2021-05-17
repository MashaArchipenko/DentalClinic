const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    info: { type: String, required: true },
    birthday: { type: Date, required: true },
    adress: { type: String, required: true },
    phone:{type:String,required:true},
    staffName: { type: String, required: true },
    img:
    {
        data: Buffer,
        contentType: String
    }
})

module.exports = model('Staff', schema)