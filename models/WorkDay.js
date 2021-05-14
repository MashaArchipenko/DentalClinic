const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    staffId: { type: Types.ObjectId, ref: 'Staff' },
    timeStart: { type: String, required: true },
    timeEnd: { type: String, required: true },
    dayNumber:{type:Array,required:true}
})

module.exports = model('WorkDay', schema)