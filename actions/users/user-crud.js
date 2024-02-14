const bcrypt   = require('bcrypt');
const User     = require('../../models/users');

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

        console.log('user created successfully',response)
    } catch(error) {
       if (error.code == 11000) {
         return res.json({"status":"error","error": "User name already exists"})
       }
       throw error
    }

    res.json({"status":"ok"})
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

    res.json({"status":"ok","success":"Successfully logged in"})

}


module.exports = {
    registerNewUser,
    loginUser
}