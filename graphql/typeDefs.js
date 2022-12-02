const { gql } = require('apollo-server')

module.exports = gql`
    scalar Upload
    
    type Message {
        text: String
        createdAt: String
        createdBy: String
    }

    type User {
        username: String
        email: String
        password: String
        token: String
    }

    type File {
        url: String
    }

    input MessageInput {
        text: String
        username: String
    }

    input RegisterInput {
        username: String
        email: String
        password: String
    }

    input LoginInput {
        email: String
        password: String
    }

    type Query {
        message(id: ID!): Message
        user(id: ID!): User
        uploads: [File]
        hello: String
    }

    type Mutation {
        createMessage(messageInput: MessageInput): Message!
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
        singleUpload(file: Upload!): File!
    }
`