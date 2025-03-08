// const User = require('../models/User.js')
// const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken')


// const login = async(req , res , next)=>{
//     const {email,password}= req.body

//     try {
//         const formatedEmail = email.toLowerCase()

//         const findedUser = await User.findOne({email:formatedEmail});

//         if(!findedUser){
//             const error = new Error("no user found");
//            error.statusCode = 400;
//            throw error;
//         }

//         const isPassMatch = await bcrypt.compare(password,findedUser.password)
//         if(!isPassMatch){
//             const error = new Error('incorrect password');
//             error.statusCode = 400;
//             throw error;

//         }

//         const accessToken = jwt.sign(
//             {email:formatedEmail,userId:findedUser._id},
//             process.env.ACCESS_TOKEN_KEY,
//             {expiresIn:"7d"}
//         );
//         res.status(200).json({message:"Login Succesfully" ,status:true, token:accessToken})

    
//     } catch (error) {
//         next(error);


        
//     }
// };

// module.exports = login;

// controllers/login.js
const User = require('../models/User.js');  // Sequelize User model
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const formattedEmail = email.toLowerCase();

        // Find user in MySQL using Sequelize's findOne method
        const foundUser = await User.findOne({ where: { email: formattedEmail } });

        if (!foundUser) {
            const error = new Error("No user found");
            error.statusCode = 400;
            throw error;
        }

        // Compare passwords using bcrypt
        const isPassMatch = await bcrypt.compare(password, foundUser.password);
        if (!isPassMatch) {
            const error = new Error('Incorrect password');
            error.statusCode = 400;
            throw error;
        }

        // Generate an access token using JWT
        const accessToken = jwt.sign(
            { email: formattedEmail, userId: foundUser.id },  // Sequelize uses `id` as the primary key
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: "7d" }
        );

        // Return success response with the token
        res.status(200).json({ message: "Login Successfully", status: true, token: accessToken });
    
    } catch (error) {
        next(error);  // Pass the error to the error-handling middleware
    }
};

module.exports = login;
