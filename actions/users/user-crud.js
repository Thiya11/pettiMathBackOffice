const bcrypt   = require('bcrypt');
const User     = require('../../models/users');
const CurrentUser = require('../../models/currentUser');
const {ObjectId}        = require('bson')

const registerNewUser = async (req,res) => {
    const {userName, password: plainTextPassword} = req.body;

    if (!userName || typeof userName !== 'string') {
        return res.json({"status":"error","error":"Invalid user name"})
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({"status":"error","error":"Invalid password"})
    }

    if (plainTextPassword.length < 6) {
        return res.json({"status":"error","error":"Password length should be grater than 6 characters"})
    }

    const password = await bcrypt.hash(plainTextPassword,10);

    try {
        const response = await User.create({
            userName,password
        })
        
     res.json({"status":"ok","success":{"userId":response._id}})

    } catch(error) {
       if (error.code == 11000) {
         return res.json({"status":"error","error": "User name already exists"})
       }
       throw error
    }
}

const loginUser = async(req,res) => {
    const {userName, password: plainTextPassword}  = req.body;

    if (!userName || typeof userName !== 'string') {
        return res.json({"status":"error","error":"Invalid user name"})
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({"status":"error","error":"Invalid password"})
    }

    if (plainTextPassword.length < 6) {
        return res.json({"status":"error","error":"Password length should be grater than 6 characters"})
    }

    const userDetails = await User.findOne({userName}).lean()

    const userCheck  = userDetails && await bcrypt.compare(plainTextPassword, userDetails.password)

    if (!userCheck) {
        return res.json({"status":"error","error":"Invalid userName/password"})
    }

    res.json({"status":"ok","success":{userID:userDetails._id},})

}

const currentUserDetails = async (req,res)=> {
    const userId = req.query.id

    if(!userId && typeof userId != 'string') {
        return res.json({"status":"error","message":"Unable to request data"})
    }
    
    const userDetails = await CurrentUser.findOne({_id: userId}).lean();

    if (!userDetails) {
        return res.json({"status":"error","message":"Unable to find user details"})
    } 

    return res.json({"status":"ok","success":{"userId":userDetails._id,"userName":userDetails.userName}})
}

const logoutUser = ((req,res)=>{
    const {userId} = req.body;
})


module.exports = {
    registerNewUser,
    loginUser,
    logoutUser,
    currentUserDetails
}