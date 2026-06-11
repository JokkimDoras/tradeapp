const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server Running');
});

app.use('/auth', authRoutes);

app.listen(8000, () => {
    console.log('Server running on port 8000');
});