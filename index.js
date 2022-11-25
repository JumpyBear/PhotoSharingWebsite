// import ApolloServer
const { ApolloServer} = require('apollo-server')
// import mongoose
const mongoose = require('mongoose')

// typeDefs.js
const typeDefs = require('./graphql/typeDefs')
// resolvers folder
const resolvers = require('./graphql/resolvers')

// connect to my mongoDB
const MONGODB = "mongodb+srv://root:admin123@cluster0.fehsl2f.mongodb.net/?retryWrites=true&w=majority"

// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
})

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB Connected')
        return server.listen({port: 5000})
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })