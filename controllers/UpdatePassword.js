// const User = require('../models/User')
// const bcrypt = require("bcryptjs");
// const UpdatePassword = async(req , res , next)=>{
//     const {password,confirmPassword , token} = req.body
//     try {
//         const findedUser = await User.findOne({'otp.token':token})
//         if(!findedUser){
//             const error = new Error("something went wrong")
//             error.statusCode = 400;
//             throw error;
//         }
//         if(new Date(findedUser.otp.sendTime).getTime()+5*60*1000< new Date().getTime()
//         ){
//             const error = new Error("something went wrong")
//             error.statusCode = 400;
//             throw error;
//     }

//     if(password !==confirmPassword){
//         const error = new Error("password does not match");
//         error.statusCode = 400;
//         throw error;
//     }

//     const hashedPassword = await bcrypt.hash(password,10)

//     findedUser.password = hashedPassword
//     findedUser.otp.sendTime=null
//     findedUser.otp.token=null

//     await findedUser.save()

//     res.status(200).json({message:"password updated succesfully " , status:true})
        
//     } catch (error) {
//         next(error)
        
//     }
//  }

//  module.exports = UpdatePassword

// const User = require('../models/User');
// const bcrypt = require("bcryptjs");

// const UpdatePassword = async (req, res, next) => {
//     const { password, confirmPassword, token } = req.body;

//     try {
//         // Find the user by OTP token
//         const findedUser = await User.findOne({
//             where: {
//                 'otp.token': token // Find user where OTP token matches
//             }
//         });

//         // Check if user exists
//         if (!findedUser) {
//             const error = new Error("No user found with this token");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if OTP has expired (5 minutes window)
//         if (new Date(findedUser.otp.sendTime).getTime() + 5 * 60 * 1000 < new Date().getTime()) {
//             const error = new Error("OTP has expired");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             const error = new Error("Passwords do not match");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Update user's password and reset OTP data
//         await findedUser.update({
//             password: hashedPassword,
//             'otp.sendTime': null,
//             'otp.token': null
//         });

//         res.status(200).json({ message: "Password updated successfully", status: true });

//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = UpdatePassword;

// const { Sequelize } = require('sequelize'); // Import Sequelize
// const User = require('../models/User');  // Sequelize User model
// const bcrypt = require("bcryptjs");

// const UpdatePassword = async (req, res, next) => {
//     const { password, confirmPassword, token } = req.body;

//     try {
//         // Find the user by OTP token
//         const findedUser = await User.findOne({
//             where: {
//                 'otp': { [Sequelize.Op.like]: `%${token}%` } // Find user where OTP token matches
//             }
//         });

//         // Check if user exists
//         if (!findedUser) {
//             const error = new Error("No user found with this token");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Parse the OTP JSON object stored in the text column
//         let storedOtp;
//         try {
//             storedOtp = JSON.parse(findedUser.otp);
//         } catch (e) {
//             const error = new Error("OTP data is corrupted");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if OTP has expired (5 minutes window)
//         if (new Date(storedOtp.sendTime).getTime() + 5 * 60 * 1000 < new Date().getTime()) {
//             const error = new Error("OTP has expired");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             const error = new Error("Passwords do not match");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Update user's password and reset OTP data
//         await findedUser.update({
//             password: hashedPassword,
//             otp: JSON.stringify({ otp: null, sendTime: null, token: null }) // Reset OTP
//         });

//         res.status(200).json({ message: "Password updated successfully", status: true });

//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = UpdatePassword;


// const { Sequelize } = require('sequelize'); // Import Sequelize
// const User = require('../models/User');  // Sequelize User model
// const bcrypt = require("bcryptjs");

// const UpdatePassword = async (req, res, next) => {
//     const { password, confirmPassword, token } = req.body;

//     try {
//         // Find the user where the OTP token matches the one stored in the OTP object (inside the `otp` column)
//         const findedUser = await User.findOne({
//             where: {
//                 otp: {
//                     [Sequelize.Op.like]: `%${token}%` // Find user where OTP token matches
//                 }
//             }
//         });

//         // Check if the user exists
//         if (!findedUser) {
//             const error = new Error("No user found with this token");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Parse the OTP object stored in the database (it should be a JSON object)
//         let storedOtp;
//         try {
//             storedOtp = JSON.parse(findedUser.otp);  // Make sure it's a valid JSON string
//         } catch (e) {
//             const error = new Error("OTP data is corrupted");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if OTP token matches the one in the stored OTP object
//         if (storedOtp.token !== token) {
//             const error = new Error("Invalid OTP token");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if the OTP has expired (5-minute validity)
//         if (new Date(storedOtp.sendTime).getTime() + 5 * 60 * 1000 < new Date().getTime()) {
//             const error = new Error("OTP has expired");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if the password and confirmPassword match
//         if (password !== confirmPassword) {
//             const error = new Error("Passwords do not match");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Update the user's password and reset the OTP data
//         await findedUser.update({
//             password: hashedPassword,
//             otp: JSON.stringify({ otp: null, sendTime: null, token: null }) // Reset OTP in the database
//         });

//         res.status(200).json({ message: "Password updated successfully", status: true });

//     } catch (error) {
//         next(error); // Pass the error to the error handler
//     }
// };

// module.exports = UpdatePassword;


// const { Sequelize } = require('sequelize'); // Import Sequelize
// const User = require('../models/User');  // Sequelize User model
// const bcrypt = require("bcryptjs");

// const UpdatePassword = async (req, res, next) => {
//     const { password, confirmPassword, token } = req.body;

//     try {
//         // Find the user where the OTP token matches the one stored in the OTP object (inside the `otp` column)
//         const findedUser = await User.findOne({
//             where: Sequelize.where(
//                 Sequelize.json('otp.token'), token // Directly compare the token inside the JSON column
//             )
//         });

//         // Check if the user exists
//         if (!findedUser) {
//             const error = new Error("No user found with this token");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Parse the OTP object stored in the database (it should be a JSON object)
//         let storedOtp;
//         try {
//             storedOtp = JSON.parse(findedUser.otp);  // Make sure it's a valid JSON string
//         } catch (e) {
//             const error = new Error("OTP data is corrupted");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if OTP token matches the one in the stored OTP object
//         if (storedOtp.token !== token) {
//             const error = new Error("Invalid OTP token");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if the OTP has expired (5-minute validity)
//         if (new Date(storedOtp.sendTime).getTime() + 5 * 60 * 1000 < new Date().getTime()) {
//             const error = new Error("OTP has expired");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if the password and confirmPassword match
//         if (password !== confirmPassword) {
//             const error = new Error("Passwords do not match");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Update the user's password and reset the OTP data
//         await findedUser.update({
//             password: hashedPassword,
//             otp: JSON.stringify({ otp: null, sendTime: null, token: null }) // Reset OTP in the database
//         });

//         res.status(200).json({ message: "Password updated successfully", status: true });

//     } catch (error) {
//         next(error); // Pass the error to the error handler
//     }
// };

// module.exports = UpdatePassword;

// const { Sequelize } = require('sequelize'); // Import Sequelize
// const User = require('../models/User');  // Sequelize User model
// const bcrypt = require("bcryptjs");

// const UpdatePassword = async (req, res, next) => {
//     const { password, confirmPassword, token } = req.body;

//     try {
//         // Find the user where the OTP token matches the one stored in the OTP object (inside the `otp` column)
//         const findedUser = await User.findOne({
//             where: Sequelize.where(
//                 Sequelize.json('otp.token'), token // Directly compare the token inside the JSON column
//             )
//         });

//         // Check if the user exists
//         if (!findedUser) {
//             const error = new Error("No user found with this token");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Parse the OTP object stored in the database (it should be a JSON object)
//         let storedOtp = findedUser.otp;
//         if (typeof storedOtp === 'string') {
//             try {
//                 storedOtp = JSON.parse(storedOtp);  // Parse it if it's a string
//             } catch (e) {
//                 const error = new Error("OTP data is corrupted");
//                 error.statusCode = 400;
//                 throw error;
//             }
//         }

//         // Check if OTP token matches the one in the stored OTP object
//         if (storedOtp.token !== token) {
//             const error = new Error("Invalid OTP token");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if the OTP has expired (5-minute validity)
//         if (new Date(storedOtp.sendTime).getTime() + 5 * 60 * 1000 < new Date().getTime()) {
//             const error = new Error("OTP has expired");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if the password and confirmPassword match
//         if (password !== confirmPassword) {
//             const error = new Error("Passwords do not match");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Update the user's password and reset the OTP data
//         await findedUser.update({
//             password: hashedPassword,
//             otp: JSON.stringify({ otp: null, sendTime: null, token: null }) // Reset OTP in the database
//         });

//         res.status(200).json({ message: "Password updated successfully", status: true });

//     } catch (error) {
//         next(error); // Pass the error to the error handler
//     }
// };

// module.exports = UpdatePassword;

// const { Sequelize } = require('sequelize');
// const User = require('../models/User');
// const bcrypt = require("bcryptjs");

// const UpdatePassword = async (req, res, next) => {
//     const { password, confirmPassword, token } = req.body;

//     try {
//         // Find user by OTP token stored in the `otp` field (as a JSON string)
//         const findedUser = await User.findOne({
//             where: Sequelize.where(
//                 Sequelize.json('otp.token'), token // Ensure we search for the token inside JSON
//             ),
//         });

//         if (!findedUser) {
//             const error = new Error("No user found with this token");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Parse the OTP object
//         let storedOtp;
//         try {
//             storedOtp = JSON.parse(findedUser.otp);
//         } catch (e) {
//             const error = new Error("OTP data is corrupted");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if OTP has expired
//         if (new Date(storedOtp.sendTime).getTime() + 5 * 60 * 1000 < new Date().getTime()) {
//             const error = new Error("OTP has expired");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if password and confirmPassword match
//         if (password !== confirmPassword) {
//             const error = new Error("Passwords do not match");
//             error.statusCode = 400;
//             throw error;
//         }

//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Update password and reset OTP field
//         await findedUser.update({
//             password: hashedPassword,
//             otp: JSON.stringify({ otp: null, sendTime: null, token: null }) // Reset OTP
//         });

//         res.status(200).json({ message: "Password updated successfully", status: true });

//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = UpdatePassword;

const { Sequelize } = require('sequelize');
const User = require('../models/User');
const bcrypt = require("bcryptjs");

const UpdatePassword = async (req, res, next) => {
    const { password, confirmPassword, token } = req.body;

    try {
        // Find user by OTP token stored in the `otp` field (as a JSON string)
        const findedUser = await User.findOne({
            where: Sequelize.literal(`JSON_EXTRACT(otp, '$.token') = '${token}'`)
        });

        if (!findedUser) {
            const error = new Error("No user found with this token");
            error.statusCode = 400;
            throw error;
        }

        // Parse the OTP object
        let storedOtp;
        try {
            storedOtp = JSON.parse(findedUser.otp);
        } catch (e) {
            const error = new Error("OTP data is corrupted");
            error.statusCode = 400;
            throw error;
        }

        // Check if OTP has expired
        if (new Date(storedOtp.sendTime).getTime() + 5 * 60 * 1000 < new Date().getTime()) {
            const error = new Error("OTP has expired");
            error.statusCode = 400;
            throw error;
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            const error = new Error("Passwords do not match");
            error.statusCode = 400;
            throw error;
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password and reset OTP field
        await findedUser.update({
            password: hashedPassword,
            otp: JSON.stringify({ otp: null, sendTime: null, token: null }) // Reset OTP
        });

        res.status(200).json({ message: "Password updated successfully", status: true });

    } catch (error) {
        next(error);
    }
};

module.exports = UpdatePassword;
