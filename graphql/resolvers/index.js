const messageResolvers = require('./message')
const userResolvers = require('./user')

module.exports = {
    Query: {
        ...messageResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...messageResolvers.Mutation,
        ...userResolvers.Mutation
    }
}