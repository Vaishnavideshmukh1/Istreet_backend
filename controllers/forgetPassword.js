// const User = require("../models/User");
// const crypto = require('crypto')
// const sendMail = require('../utils/sendMail');

// const forgetPassword = async(req , res , next)=>{

//     const {email} = req.body
//     try {
        
//         const formatedEmail = email.toLowerCase()
//         const findedUser = await User.findOne({email:formatedEmail})

//         if(!findedUser){
//             const error = new Error('no user found')
//             error.statusCode = 400;
//             throw error;
//         }

//         if(findedUser.otp.otp && new Date(findedUser.otp.sendTime).getTime() > new Date().getTime()){
//             const error = new Error(
//                 `please wait until ${new Date(findedUser.otp.sendTime ).toLocaleTimeString()}`

//             );
//             error.statusCode = 400
//             throw error;
//         }



//         const otp = Math.floor(Math.random()*90000)+100000
//         console.log(otp)

//         const token = crypto.randomBytes(32).toString('hex')

//         findedUser.otp.otp = otp
//         findedUser.otp.sendTime = new Date().getTime()+1*60*1000;
//         findedUser.otp.token = token 

//          await findedUser.save()
//          sendMail(otp,formatedEmail);

//          res.status(200).json({message:'please check your email for otp', status:true,token})

//     } catch (error) {
//         next(error);
        
//     }
// }

// module.exports = forgetPassword;


// const User = require("../models/User");
// const crypto = require('crypto');
// const sendMail = require('../utils/sendMail');
// const { Op } = require('sequelize');  // For using Sequelize operators

// const forgetPassword = async (req, res, next) => {
//   const { email } = req.body;
//   try {
//     const formatedEmail = email.toLowerCase();

//     // Find user by email
//     const findedUser = await User.findOne({
//       where: { email: formatedEmail },
//     });

//     if (!findedUser) {
//       const error = new Error('No user found');
//       error.statusCode = 400;
//       throw error;
//     }

//     // Check if OTP exists and if it is still valid
//     if (findedUser.otp && findedUser.otp.otp && new Date(findedUser.otp.sendTime).getTime() > new Date().getTime()) {
//       const error = new Error(
//         `Please wait until ${new Date(findedUser.otp.sendTime).toLocaleTimeString()}`
//       );
//       error.statusCode = 400;
//       throw error;
//     }

//     // Generate a new OTP
//     const otp = Math.floor(Math.random() * 90000) + 100000;
//     console.log(otp);

//     // Generate a new token for password reset
//     const token = crypto.randomBytes(32).toString('hex');

//     // Update the user's OTP information
//     findedUser.otp = {
//       otp: otp,
//       sendTime: new Date().getTime() + 1 * 60 * 1000, // 1 minute expiry
//       token: token,
//     };

//     // Save the updated user in the database
//     await findedUser.save();

//     // Send the OTP to the user's email
//     sendMail(otp, formatedEmail);

//     res.status(200).json({ message: 'Please check your email for OTP', status: true, token });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = forgetPassword;


// const User = require("../models/User");
// const crypto = require('crypto');
// const sendMail = require('../utils/sendMail');

// const forgetPassword = async (req, res, next) => {
//   const { email } = req.body;
//   try {
//     const formatedEmail = email.toLowerCase();

//     // Find user by email
//     const findedUser = await User.findOne({
//       where: { email: formatedEmail },
//     });

//     if (!findedUser) {
//       const error = new Error('No user found');
//       error.statusCode = 400;
//       throw error;
//     }

//     // Check if OTP exists and if it is still valid
//     let otpData;
//     if (findedUser.otp) {
//       otpData = JSON.parse(findedUser.otp); // Deserialize OTP from the string

//       if (otpData.otp && new Date(otpData.sendTime).getTime() > new Date().getTime()) {
//         const error = new Error(
//           `Please wait until ${new Date(otpData.sendTime).toLocaleTimeString()}`
//         );
//         error.statusCode = 400;
//         throw error;
//       }
//     }

//     // Generate a new OTP
//     const otp = Math.floor(Math.random() * 90000) + 100000;
//     console.log(otp);

//     // Generate a new token for password reset
//     const token = crypto.randomBytes(32).toString('hex');

//     // Prepare the OTP data object
//     otpData = {
//       otp: otp,
//       sendTime: new Date().getTime() + 1 * 60 * 1000, // 1 minute expiry
//       token: token,
//     };

//     // Update the user's OTP information (Stringify the object before saving)
//     findedUser.otp = JSON.stringify(otpData); 

//     // Save the updated user in the database
//     await findedUser.save();

//     // Send the OTP to the user's email
//     sendMail(otp, formatedEmail);

//     res.status(200).json({ message: 'Please check your email for OTP', status: true, token });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = forgetPassword;


const User = require('../models/User');
const crypto = require('crypto');
const sendMail = require('../utils/sendMail');

const forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    
    try {
        const formattedEmail = email.toLowerCase();

        // Find user by email
        const findedUser = await User.findOne({ where: { email: formattedEmail } });

        if (!findedUser) {
            const error = new Error('No user found');
            error.statusCode = 400;
            throw error;
        }

        // Generate a new OTP
        const otp = Math.floor(Math.random() * 90000) + 100000;
        const token = crypto.randomBytes(32).toString('hex');

        // Update the user's OTP information
        findedUser.otp = JSON.stringify({
            otp: otp,
            sendTime: new Date().getTime() + 1 * 60 * 1000, // OTP expires in 1 minute
            token: token,
        });

        // Save the updated user in the database
        await findedUser.save();

        // Send the OTP to the user's email
        sendMail(otp, formattedEmail);

        // Respond with the token (return this token to be used for password reset)
        res.status(200).json({ message: 'Please check your email for OTP', status: true, token });
    } catch (error) {
        next(error);
    }
};

module.exports = forgetPassword;

