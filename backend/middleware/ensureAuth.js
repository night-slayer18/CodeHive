const dotenv = require('dotenv');
dotenv.config();
const ensureAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(`${process.env.CLIENT_BASE_URL}/login`)

}

module.exports = ensureAuth;