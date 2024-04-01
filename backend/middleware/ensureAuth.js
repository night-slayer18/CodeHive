const dotenv = require('dotenv');
dotenv.config();
const ensureAuthenticated = async (req, res, next) =>{
	if (req.isAuthenticated()) {
		console.log("User is authenticated")
		next();
	}
	console.log("User is not authenticated")
	res.redirect(process.env.CLIENT_BASE_URL + "/login");
}

module.exports = ensureAuthenticated;