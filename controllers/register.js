// const User = require('../models/User.js');
// const bcrypt = require('bcryptjs');
// const joi = require('joi');

// const register = async (req, res, next) => {
//     const { error: validationError } = validateUser(req.body);

//     if (validationError) {
//         return res.status(400).json({ message: validationError.details[0].message, status: false });
//     }

//     const { name, email, password } = req.body;

//     try {
//         const formattedName = name.trim().toLowerCase();
//         const formattedEmail = email.trim().toLowerCase();

//         // Check if the email already exists
//         const existingUser = await User.findOne({ email: formattedEmail });

//         if (existingUser) {
//             return res.status(400).json({ message: 'This email already exists', status: false });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = new User({
//             name: formattedName,
//             email: formattedEmail,
//             password: hashedPassword,
//         });

//         await newUser.save();

//         res.status(200).json({ message: "User registered successfully", status: true });
//     } catch (error) {
//         next(error); // Pass the error to the error-handling middleware
//     }
// };

// module.exports = register;

// function validateUser(data) {
//     const UserSchema = joi.object({
//         name: joi.string().min(2).required(),
//         email: joi.string().email().required(),
//         password: joi.string().min(6).max(12).required(),
//     });
//     return UserSchema.validate(data);
// }



// // controllers/register.js
// const User = require('../models/User'); // Sequelize User model
// const bcrypt = require('bcryptjs');
// const joi = require('joi');

// const register = async (req, res, next) => {
//     const { error: validationError } = validateUser(req.body);

//     if (validationError) {
//         return res.status(400).json({ message: validationError.details[0].message, status: false });
//     }

//     const { name, email, password } = req.body;

//     try {
//         const formattedName = name.trim().toLowerCase();
//         const formattedEmail = email.trim().toLowerCase();

//         // Check if the email already exists using Sequelize's findOne method
//         const existingUser = await User.findOne({ where: { email: formattedEmail } });

//         if (existingUser) {
//             return res.status(400).json({ message: 'This email already exists', status: false });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user using Sequelize's create method
//         await User.create({
//             name: formattedName,
//             email: formattedEmail,
//             password: hashedPassword,
//             otp: {} // Add the otp field if needed; it's a JSON object in MySQL
//         });

//         res.status(200).json({ message: "User registered successfully", status: true });
//     } catch (error) {
//         next(error); // Pass the error to the error-handling middleware
//     }
// };

// module.exports = register;

// function validateUser(data) {
//     const UserSchema = joi.object({
//         name: joi.string().min(2).required(),
//         email: joi.string().email().required(),
//         password: joi.string().min(6).max(12).required(),
//     });
//     return UserSchema.validate(data);
// }


const User = require('../models/User'); // Sequelize User model
const bcrypt = require('bcryptjs');
const joi = require('joi');

const register = async (req, res, next) => {
    const { error: validationError } = validateUser(req.body);

    if (validationError) {
        return res.status(400).json({ message: validationError.details[0].message, status: false });
    }

    const { name, email, password } = req.body;

    try {
        const formattedName = name.trim().toLowerCase();
        const formattedEmail = email.trim().toLowerCase();

        // Check if the email already exists using Sequelize's findOne method
        const existingUser = await User.findOne({ where: { email: formattedEmail } });

        if (existingUser) {
            return res.status(400).json({ message: 'This email already exists', status: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user using Sequelize's create method
        await User.create({
            name: formattedName,
            email: formattedEmail,
            password: hashedPassword,
            otp: JSON.stringify({}) // Store OTP as a string (JSON)
        });

        res.status(200).json({ message: "User registered successfully", status: true });
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};

module.exports = register;

function validateUser(data) {
    const UserSchema = joi.object({
        name: joi.string().min(2).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(12).required(),
    });
    return UserSchema.validate(data);
}
