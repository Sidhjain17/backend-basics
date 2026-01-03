require('dotenv').config();
const express = require("express");
const connectDB = require("./db");
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({origin: '*',}))
app.use(express.json());
connectDB();

app.get('/health',(req,res)=>{
    res.json({status: "Backend is running"});
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
