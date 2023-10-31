const jwt = require('jsonwebtoken')
function verifySocketUser(socket, next) {
    let token = socket.handshake.headers?.authorization
    if (!token) return next(new Error("Authentication failed"))
    token = token.split(" ")
    if (token[0] !== "Bearer") return next(new Error("Authentication failed"))
    if (!token[1]) return next(new Error("Authentication failed"))
    try {

        jwt.verify(token,'')
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  
  module.exports = verifySocketUser