const { signUp, login } = require("../pages/auth/auth")
const {logOut} = require("../pages/auth/refreshToken")
const express = require("express")

const router =express.Router()

router.post("/sighUp",signUp)

router.post("/login",login)

router.delete("/logout",logOut)

module.exports = router