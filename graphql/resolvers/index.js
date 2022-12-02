const messageResolvers = require('./message')
const userResolvers = require('./user')
const uploadResolvers = require('./upload')

module.exports = {
    Query: {
        ...messageResolvers.Query,
        ...userResolvers.Query,
        ...uploadResolvers.Query
    },
    Mutation: {
        ...messageResolvers.Mutation,
        ...userResolvers.Mutation,
        ...uploadResolvers.Mutation
    }
}