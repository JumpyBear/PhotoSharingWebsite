const { model, Schema } = require('mongoose')

// mongoDB User model
// Store userdata in MongoDB
const fileSchema = new Schema({
    path: { type: String },
    filename: { type: String },
    mimetype: { type: String },
    encoding: { type: String }
})

module.exports = model('File', fileSchema)