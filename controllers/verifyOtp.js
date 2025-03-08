// const User = require('../models/User')

// const VerifyOtp = async(req , res , next) =>{
//     const {otp} = req.body

//     try {
//         const findedUser = await User.findOne({"otp.otp":otp});

//         if(!findedUser){
//             const error = new Error('invalid OTP')
//             error.statusCode = 400
//             throw error
//         }

//         if(new Date(findedUser.otp.sendTime).getTime()<new Date().getTime()){
//             const error = new Error("otp expired");
//             error.statusCode = 400;
//             throw error;


//         }
//         findedUser.otp.otp=null;
//         await findedUser.save();

//         res.status(200).json({message: "otp verified", status:true})
//     } catch (error) {
//         next(error)
        
//     }
// }
// module.exports = VerifyOtp

// const User = require('../models/User'); // Sequelize User model

// const VerifyOtp = async (req, res, next) => {
//     const { otp } = req.body;

//     try {
//         // Find the user where OTP matches
//         const findedUser = await User.findOne({
//             where: {
//                 'otp.otp': otp, // Match OTP field in the user record
//             }
//         });

//         if (!findedUser) {
//             const error = new Error('Invalid OTP');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if OTP has expired
//         if (new Date(findedUser.otp.sendTime).getTime() < new Date().getTime()) {
//             const error = new Error('OTP expired');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Reset OTP in the user's record
//         await findedUser.update({
//             'otp.otp': null,  // Reset OTP field to null
//         });

//         res.status(200).json({ message: 'OTP verified successfully', status: true });

//     } catch (error) {
//         next(error); // Pass the error to the error-handling middleware
//     }
// };

// module.exports = VerifyOtp;


// const User = require('../models/User');  // Sequelize User model

// const VerifyOtp = async (req, res, next) => {
//     const { otp } = req.body;

//     try {
//         // Find the user by matching OTP string in the otp column
//         const findedUser = await User.findOne({ where: { email: req.body.email } }); // Use email or other identifier

//         if (!findedUser) {
//             const error = new Error('No user found');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Parse the OTP from the string in the `otp` TEXT column
//         const storedOtp = JSON.parse(findedUser.otp); // Parse the JSON string

//         // Check if OTP matches
//         if (storedOtp.otp !== otp) {
//             const error = new Error('Invalid OTP');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if OTP is expired
//         if (new Date(storedOtp.sendTime).getTime() < new Date().getTime()) {
//             const error = new Error('OTP expired');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Reset OTP after successful verification
//         findedUser.otp = JSON.stringify({ otp: null, sendTime: null, token: null }); // Clear OTP after use
//         await findedUser.save();

//         res.status(200).json({ message: 'OTP verified successfully', status: true });
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = VerifyOtp;


// const User = require('../models/User');  // Sequelize User model

// const VerifyOtp = async (req, res, next) => {
//     const { email, otp } = req.body;

//     try {
//         // Ensure email is provided in the body
//         if (!email || !otp) {
//             return res.status(400).json({ message: 'Email and OTP are required', status: false });
//         }

//         // Query user by email
//         const findedUser = await User.findOne({
//             where: {
//                 email: email,  // Properly accessing the email field
//             },
//         });

//         if (!findedUser) {
//             const error = new Error('Invalid email');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Parse the OTP JSON object stored in the text column
//         const storedOtp = JSON.parse(findedUser.otp);

//         // Validate the OTP
//         if (storedOtp.otp !== otp) {
//             const error = new Error('Invalid OTP');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if OTP has expired
//         if (new Date(storedOtp.sendTime).getTime() < new Date().getTime()) {
//             const error = new Error('OTP expired');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Reset OTP after successful verification
//         findedUser.otp = JSON.stringify({ otp: null, sendTime: null, token: null });
//         await findedUser.save();

//         res.status(200).json({ message: 'OTP verified successfully', status: true });
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = VerifyOtp;


// const User = require('../models/User');  // Sequelize User model

// const VerifyOtp = async (req, res, next) => {
//     const { email, otp } = req.body;

//     try {
//         // Ensure email and OTP are provided in the request body
//         if (!email || !otp) {
//             return res.status(400).json({ message: 'Email and OTP are required', status: false });
//         }

//         // Query user by email
//         const findedUser = await User.findOne({
//             where: { email: email },
//         });

//         if (!findedUser) {
//             const error = new Error('Invalid email');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Parse the OTP object stored in the database
//         let storedOtp;
//         try {
//             storedOtp = JSON.parse(findedUser.otp);
//         } catch (e) {
//             // Handle error if the OTP is not valid JSON
//             console.error('Error parsing OTP:', e);
//             const error = new Error('OTP data is corrupted');
//             error.statusCode = 400;
//             throw error;
//         }

//         console.log('Stored OTP:', storedOtp); // Debugging log

//         // Convert both the stored OTP and the provided OTP to strings before comparing
//         const storedOtpValue = storedOtp.otp.toString();
//         const providedOtpValue = otp.toString();

//         console.log('Comparing stored OTP:', storedOtpValue);
//         console.log('With provided OTP:', providedOtpValue);

//         // Validate the OTP
//         if (storedOtpValue !== providedOtpValue) {
//             console.log('Stored OTP does not match the provided OTP'); // Debugging log
//             const error = new Error('Invalid OTP');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if OTP has expired
//         if (new Date(storedOtp.sendTime).getTime() < new Date().getTime()) {
//             const error = new Error('OTP expired');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Reset OTP after successful verification
//         findedUser.otp = JSON.stringify({ otp: null, sendTime: null, token: null });
//         await findedUser.save();

//         res.status(200).json({ message: 'OTP verified successfully', status: true });
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = VerifyOtp;

// const User = require('../models/User');  // Sequelize User model

// const VerifyOtp = async (req, res, next) => {
//     const { email, otp } = req.body;

//     try {
//         // Ensure email and OTP are provided in the request body
//         if (!email || !otp) {
//             return res.status(400).json({ message: 'Email and OTP are required', status: false });
//         }

//         // Query user by email
//         const findedUser = await User.findOne({
//             where: { email: email },
//         });

//         if (!findedUser) {
//             const error = new Error('Invalid email');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Parse the OTP object stored in the database
//         let storedOtp;
//         try {
//             storedOtp = JSON.parse(findedUser.otp);
//         } catch (e) {
//             // Handle error if the OTP is not valid JSON
//             console.error('Error parsing OTP:', e);
//             const error = new Error('OTP data is corrupted');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if storedOtp and storedOtp.otp are not null or undefined
//         if (!storedOtp || !storedOtp.otp) {
//             const error = new Error('No OTP found for this user');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Convert both the stored OTP and the provided OTP to strings before comparing
//         const storedOtpValue = storedOtp.otp.toString();
//         const providedOtpValue = otp.toString();

//         // Validate the OTP
//         if (storedOtpValue !== providedOtpValue) {
//             console.log('Stored OTP does not match the provided OTP'); // Debugging log
//             const error = new Error('Invalid OTP');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Check if OTP has expired
//         if (new Date(storedOtp.sendTime).getTime() < new Date().getTime()) {
//             const error = new Error('OTP expired');
//             error.statusCode = 400;
//             throw error;
//         }

//         // Reset OTP after successful verification
//         findedUser.otp = JSON.stringify({ otp: null, sendTime: null, token: null });
//         await findedUser.save();

//         res.status(200).json({ message: 'OTP verified successfully', status: true });
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = VerifyOtp;

const { Op } = require('sequelize'); // Import Op from Sequelize
const User = require('../models/User');  // Sequelize User model

const VerifyOtp = async (req, res, next) => {
    const { otp } = req.body;

    try {
        // Ensure OTP is provided in the request body
        if (!otp) {
            return res.status(400).json({ message: 'OTP is required', status: false });
        }

        // Find the user where OTP matches
        const findedUser = await User.findOne({
            where: {
                otp: {
                    [Op.like]: `%${otp}%` // Sequelize operator to check if OTP is part of the stored value
                },
            },
        });
 console.log({otp})
        if (!findedUser) {
            const error = new Error('Invalid OTP');
            error.statusCode = 400;
            throw error;
        }

        // Parse the OTP object stored in the database
        let storedOtp;
        try {
            storedOtp = JSON.parse(findedUser.otp);
        } catch (e) {
            // Handle error if the OTP is not valid JSON
            console.error('Error parsing OTP:', e);
            const error = new Error('OTP data is corrupted');
            error.statusCode = 400;
            throw error;
        }

        // Check if storedOtp and storedOtp.otp are not null or undefined
        if (!storedOtp || !storedOtp.otp) {
            const error = new Error('No OTP found for this user');
            error.statusCode = 400;
            throw error;
        }

        // Convert both the stored OTP and the provided OTP to strings before comparing
        const storedOtpValue = storedOtp.otp.toString();
        const providedOtpValue = otp.toString();

        // Validate the OTP
        if (storedOtpValue !== providedOtpValue) {
            console.log('Stored OTP does not match the provided OTP'); // Debugging log
            const error = new Error('Invalid OTP');
            error.statusCode = 400;
            throw error;
        }

        // Check if OTP has expired
        if (new Date(storedOtp.sendTime).getTime() < new Date().getTime()) {
            const error = new Error('OTP expired');
            error.statusCode = 400;
            throw error;
        }

        // Reset OTP after successful verification
        findedUser.otp = JSON.stringify({ otp: null, sendTime: null, token: null });
        await findedUser.save();

        res.status(200).json({ message: 'OTP verified successfully', status: true });
    } catch (error) {
        next(error);
    }
};

module.exports = VerifyOtp;
