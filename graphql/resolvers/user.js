const User = require('../../models/User')
const { ApolloError } = require('apollo-server-errors')
// import bcrypt to encrypt password
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    Mutation: {
        async registerUser(__, {registerInput: {username, email, password}}) {
            // an old user exists with email and attempt to register
            const oldUser = await User.findOne({ email })

            if(oldUser) {
                // Use apollo server error to throw error
                throw new ApolloError(`The user is already exists with the email: ${email}`, 'USER_ALREADY_EXISTS')
            }

            // Encrypt password (password, salt)
            let encryptedPassword = await bcrypt.hash(password, 8)

            // Build Mongoose model
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            })

            // Create our JWT
            // jwt.sign(payload)
            const token = jwt.sign(
                { user_id: newUser._id, email},
                "Flappy_Bear",
                {
                    expiresIn: "3h"
                }
            )

            // Attach to our User model
            newUser.token = token

            // Save our user in MongoDB
            const res = await newUser.save()
            return {
                id: res.id,
                // get all the properties from the response
                ...res._doc
            }
        },
        async loginUser(__, {loginInput: {email, password}}) {
            // See if a user exists with the email
            const user = await User.findOne({ email })

            // See the entered password = exist encrypted password
            if(user && (await bcrypt.compare(password, user.password))) {
                // Create a new token
                const token = jwt.sign(
                    { user_id: user._id, email},
                    "Flappy_Bear",
                    {
                        expiresIn: "3h"
                    }
                )
                // Attach token to user model
                user.token = token
                return {
                    id: user.id,
                    ...user._doc
                }
            } else {
                // If user doesnt exist, return error
                throw new ApolloError('Password is wrong!', 'WRONG_PWD')
            }     
        }
    },
    Query: {
        // message: (__, {ID}) => Message.findById(ID)
        user: (__, {ID}) => User.findById(ID)
    }
}