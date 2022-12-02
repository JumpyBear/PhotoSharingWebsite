const Upload = require('../../models/Upload')

// const { GraphQLUpload } = require('graphql-upload')

const path = require('path')
const fs = require('fs')

module.exports = {
    // Upload: GraphQLUpload,
    Query: {
        uploads: (parent, args) => Upload.find({})
    },
    Mutation: {
        singleUpload: async (parent, {file}) => {
            const { createReadStream, filename, mimetype, encoding } = await file
            const stream = createReadStream()
            const pathName = path.join(__dirname, `../../public/images/${filename}`)
            await stream.pipe(fs.createWriteStream(pathName))

            return {
                url: `http://localhost:3000/images/${filename}`
            }
        }
    }
}