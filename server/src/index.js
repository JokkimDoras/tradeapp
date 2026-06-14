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

const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running securely on port ${PORT}`);
});