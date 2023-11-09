const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
	const token = req.headers["x-access-token"] 
	if (!token)
		return res.status(403).json({ 
            error: true, 
            message: "Access Denied: No token provided" 
        })
	try {
		let isJwtValid = false
		const tokenDetails = jwt.verify(token,process.env.ACCESS_TOKEN_PRIVATE_KEY,(err,data)=>{
			console.log(err);
			console.log(data);
			if(err)
				{return;}
			isJwtValid=true
		})
		if(!isJwtValid){
			res.status(403).json({
			error:true,
			message:"Invalid token"
		})
		}
		req.user = tokenDetails
		next()
	} catch (err) {
		console.log(err)
		res.status(403).json({ 
            error: true, 
            message: "Access token is expired" 
        })
	}
}

module.exports = auth 