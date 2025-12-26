const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async(req,res)=>{
    try {
        const {name, role, goal,password} = req.body

    if(!name || !role || !password){
        return res.status(400).json({
            error: 'name,role and password are required'
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    await User.create({name,role,goal, password: hashedPassword});
    res.status(201).json({
        message: 'User registered successfully'
    })
    } catch (error) {
        res.status(500).json({
            error : 'Signup failed'
        })
    }
    
}

exports.login = async(req,res)=>{
    try {
        const {name, password} = req.body

        const user = await User.findOne({name});

    if(!user){
        return res.status(401).json({
            error: 'Invalid credentials'
        })
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.status(401).json({
            error: 'Invalid credentials'
        })
    }

    const token = jwt.sign(
        {userId: user._id},
        JWT_SECRET,
        {expiresIn: '1h'}
    )

    res.status(200).json({
        message: 'Login successfully',
        token
    })
    } catch (error) {
        res.status(500).json({
            error : 'Login failed'
        })
    }
    
}