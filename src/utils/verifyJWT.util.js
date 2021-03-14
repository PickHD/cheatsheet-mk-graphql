"use strict"

const jwt = require("jsonwebtoken"),
  { promisify } = require("util")

const verifyPayloadFromToken = async (token) => {
  try {
    const jwtVerifyPromise = promisify(jwt.verify).bind(jwt)
    return await jwtVerifyPromise(token, process.env.JWT_SECRET)
  } catch (e) {
    throw new Error(e)
  }
}

const getPayLoad = async (req) => {
  try {
    const authHeader = req.headers.authorization,
      token = authHeader.replace("Bearer ", "")

    if (authHeader) {
      if (!token) {
        throw new Error("No token found")
      }

      const { userId, userRoles } = await verifyPayloadFromToken(token)

      return { userId, userRoles }
    } else {
      throw new Error("Unauthorized")
    }
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = getPayLoad