const express = require('express')
const UserToken = require("../../model/user_token")
const jwt  = require("jsonwebtoken")
const {
	signUpBodyValidation,
	logInBodyValidation,
	refreshTokenBodyValidation,
} = require("../../utils/validationSchema")

// get new access token
const getNewAccessToken = async (req, res) => {
	const { error } = refreshTokenBodyValidation(req.body)
	if (error)
		return res.status(400).json({ 
            error: true, 
            message: error.details[0].message 
        })

	verifyRefreshToken(req.body.refreshToken)
		.then(({ tokenDetails }) => {
			const payload = { _id: tokenDetails._id}
			const accessToken = jwt.sign(
				payload,
				process.env.ACCESS_TOKEN_PRIVATE_KEY,
				{ expiresIn: "14m" }
			)
			res.status(200).json({
				error: false,
				accessToken,
				message: "Access token created successfully",
			})
		})
		.catch((err) => res.status(400).json(err))
}

//delete
const logOut = async(req, res) => {
	try {
		const { error } = refreshTokenBodyValidation(req.body)
		if (error)
			return res.status(400).json({ 
				error: true, 
				message: error.details[0].message 
			})

		const userToken = await UserToken.findOne({ token: req.body.refreshToken })
		// we have to stop the access token from working
		if (!userToken)
			return res.status(200).json({ 
				error: false, 
				message: "Logged Out Sucessfully" 
			})

		await userToken.deleteOne()
		res.status(200).json({ 
			error: false, 
			message: "Logged Out Sucessfully" 
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({ 
			error: true, 
			message: "Internal Server Error" 
		})
	}
}

module.exports = {getNewAccessToken,logOut}