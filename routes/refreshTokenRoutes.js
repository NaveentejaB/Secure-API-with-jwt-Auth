const express = require("express")
const {getNewAccessToken,logOut} = require("../pages/auth/refreshToken")

const refreshTokenRouter = express.Router()

refreshTokenRouter.post("/",getNewAccessToken)

refreshTokenRouter.delete("/",logOut)

module.exports = refreshTokenRouter
