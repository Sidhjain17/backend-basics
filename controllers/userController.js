const User = require('../models/User');

exports.getUsers = async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const skip = (page - 1) * limit
        const users = await User.find().skip(skip).limit(limit).sort({_id:-1});
        const totalUsers = await User.countDocuments();
        res.status(200).json({
            page,
            limit,
            totalUsers,
            totalPages: Math.ceil(totalUsers/limit),
            users
        })
    } catch (error) {
        res.status(500).json({
            error : 'Failed to fetch users'
        })
    }
};

exports.getUserById = async(req,res)=>{
    try {
        const userId = req.params.id
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                error: 'User not found'
            })
        }

        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(400).json({
            error : 'Invalid user ID'
        })
    }
};

exports.updateUser = async(req,res)=>{
    try {
        const userId = req.params.id
        const {name, role, goal} = req.body

        if(!name && !role && !goal){
        return res.status(400).json({
            error: 'Atleast one field is required to update'
        })
    }

        const updatedUser = await User.findByIdAndUpdate(userId, {name,role,goal}, {new: true});

        if(!updatedUser){
            return res.status(404).json({
                error: 'User not found'
            })
        }

        res.status(200).json({
            message: 'User updated successfulyy',
            user: updatedUser
        })
    } catch (error) {
        res.status(400).json({
            error : 'Invalid user ID'
        })
    }
};

exports.deleteUser = async(req,res)=>{
    try {
        const userId = req.params.id

        const deletedUser = await User.findByIdAndDelete(userId);

        if(!deletedUser){
            return res.status(404).json({
                error: 'User not found'
            })
        }

        res.status(200).json({
            message: 'User deleted successfulyy',
        })
    } catch (error) {
        res.status(400).json({
            error : 'Invalid user ID'
        })
    }
};