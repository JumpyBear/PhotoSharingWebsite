const { model, Schema } = require('mongoose')

// mongoDB message model
const messageSchema = new Schema({
    text: String,
    createdAt: String,
    createdBy: String,
})

module.exports = model('Message', messageSchema)