const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./database/db');
const session = require('express-session');

require("./passport/github.auth.js");

dotenv.config();

const app = express();
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true
}));


app.get('/', (req, res) => {
    res.json({ message: 'Hello from server!' });
}) 

app.use('/api/users', require('./routes/user.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/explore', require('./routes/explore.routes'));

app.listen(5000, () => {
    connectDB();
    console.log('Server is listening on port 5000...');
});