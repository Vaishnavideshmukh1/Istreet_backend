// // models/User.js
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../utils/getConnection').sequelize;

// const User = sequelize.define('User', {
//     // Define your columns
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     otp: {
//         type: DataTypes.JSONB,  // For storing OTP as a JSON object
//     }
// }, {
//     timestamps: false,  // Disable createdAt and updatedAt columns
// });

// module.exports = User;



// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/getConnection').sequelize;  // This will be your MySQL connection

// Defining User model
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp: {
        type: DataTypes.TEXT,  // Store OTP as a JSON object in MySQL
        allowNull: true,  // Optional field
    }
}, {
    // Setting timestamps to true to auto-manage createdAt and updatedAt
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

// Export User model to use in other files
module.exports = User;