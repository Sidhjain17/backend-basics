const User = require("../models/User")

const requireRole = (role) =>{
    return async(req,res,next)=>{
        try {
            const user = await User.findById(req.userId)

            if(!user){
                return res.status(401).json({
                    error: 'User not found'
                })
            }

            if(user.role !== role){
                return res.status(403).json({
                    error: 'Access Denied'
                })
            }
            next();
        } catch (error) {
            res.status(500).json({
                error: "Role check failed"
            })
        }
    }
}

module.exports = requireRole;