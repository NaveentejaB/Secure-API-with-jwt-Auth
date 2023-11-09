const User = require( "../../model/user_model.js")
const bcrypt = require("bcrypt")
const generateTokens = require( "../../utils/generateToken.js")
const {
	signUpBodyValidation,
	logInBodyValidation,
} = require( "../../utils/validationSchema.js")


// signup router.post("/signUp",
const signUp = async (req, res) => {
	try {
		const { error } = signUpBodyValidation(req.body)
		if (error)
			return res.status(400).json({ 
                error: true, 
                message: error.details[0].message 
            })

		const user = await User.findOne({ userName: req.body.userName })
		if (user)
			return res.status(400).json({ 
                error: true, 
                message: "User with given name already exist" 
            })

		const salt = await bcrypt.genSalt(Number(process.env.SALT))
		const hashPassword = await bcrypt.hash(req.body.password, salt)

		await new User({ ...req.body, password: hashPassword }).save()
		res.status(201).json({ 
            error: false, 
            message: "Account created sucessfully" 
        })
	} catch (err) {
		console.log(err)
		res.status(500).json({ 
            error: true, 
            message: "Internal Server Error" 
        })
	}
}

// login router.post("/logIn", 
const login = async (req, res) => {
	try {
		const { error } = logInBodyValidation(req.body)
		if (error)
			return res.status(400).json({ 
                error: true, 
                message: error.details[0].message 
            })
		const user = await User.findOne({ userName: req.body.userName })
		if (!user)
			return res.status(401).json({ 
                error: true, 
                message: "Invalid userName or password" 
            })

		const verifiedPassword = await bcrypt.compare(
			req.body.password,
			user.password
		)
		if (!verifiedPassword)
			return res.status(401).json({ 
                error: true, 
                message: "Invalid user name or password" 
            })

		const { accessToken, refreshToken } = await generateTokens(user)
		// console.log(`acces token : ${accessToken}`)
		// console.log(`refresh token : ${refreshToken}`)
		res.status(200).json({
			error: false,
			accessToken,
			refreshToken,
			message: "Logged in sucessfully",
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({ 
            error: true, 
            message: "Internal Server Error" 
        })
	}
}

module.exports = { signUp, login }
