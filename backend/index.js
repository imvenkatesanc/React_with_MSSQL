const express = require('express');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();
const port = 3000;

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})