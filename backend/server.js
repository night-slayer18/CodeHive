const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/db');

dotenv.config();

const app = express();
app.use(cors());


app.get('/', (req, res) => {
    res.json({ message: 'Hello from server!' });
}) 

app.use('/api/users', require('./routes/user.routes'));
app.use('/api/explore', require('./routes/explore.routes'));

app.listen(5000, () => {
    connectDB();
    console.log('Server is listening on port 5000...');
});