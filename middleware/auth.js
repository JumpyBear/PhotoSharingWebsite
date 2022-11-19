const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

module.exports = (context) => {
    const authHeader = context.req.headers.authorization
    if(authHeader) {
        // Get the token when login/register
        const token = authHeader.split('Bearer')[1]
        // See token is valid
        if(token) {
            try {
                const user = jwt.verify(token, "Flappy_Bear")
                return user
            } catch(err) {
                throw new AuthenticationError('Invalid token')
            }
        }
        // Format of token not correct
        throw new Error('Format of token is not correct!')
    }
    throw new Error('Header must be provided!')
}