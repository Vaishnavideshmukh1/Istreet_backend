// require('dotenv').config();
// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')
// const getConnection = require('./utils/getConnection.js');
// const userRoutes = require('./routes/user')



// const app = express()
// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({extended : true,limit:'50mb'}))


// app.use('/user' , userRoutes)

// app.use((error , req, res , next) =>{
//     const message = error.message || 'server error';
//     const statusCode = error.statusCode || 500

//     res.status(statusCode).json({message:message});

// });

// getConnection();
// app.listen(process.env.PORT,()=>
//     console.log('server is running on port :'+process.env.PORT)
// );


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getConnection } = require('../backend-main/utils/getConnection.js'); // Correct function name
const userRoutes = require('./routes/user'); // User routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Use the user routes
app.use('/user', userRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  const message = error.message || 'Server error';
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({ message: message });
});

// Connect to MySQL
getConnection();  // Correct function name

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
