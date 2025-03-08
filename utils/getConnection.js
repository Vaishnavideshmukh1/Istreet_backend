// const mongoose = require('mongoose');

// const getConnection = async () => {
//     try {
//         mongoose.set('strictQuery', true);
//         await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("DB is connected");
//     } catch (error) {
//         console.error("Failed to connect to DB:", error.message);
//     }
// };

// module.exports = getConnection;


const { Sequelize } = require('sequelize'); // Import Sequelize
require('dotenv').config();

// Set up the MySQL connection using Sequelize
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,  // Database name from .env
    process.env.MYSQL_USER,      // MySQL username from .env
    process.env.MYSQL_PASSWORD,  // MySQL password from .env
    {
        host: process.env.MYSQL_HOST,  // Host (localhost or another host)
        dialect: 'mysql',              // Database dialect
        logging: false,                // Disable logging (optional)
    }
);

// Function to establish the MySQL connection
const getConnection = async () => {
    try {
        // Try to authenticate the connection
        await sequelize.authenticate();
        console.log('MySQL Database connected successfully');
    } catch (error) {
        console.error('Failed to connect to MySQL DB:', error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

// Export the connection object and the getConnection function
module.exports = { getConnection, sequelize };

