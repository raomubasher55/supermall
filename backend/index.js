require('dotenv').config();
const  mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const express  = require('express');
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(express.static('public'));

// Allow only specific origins
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ['https://supermall.digital', 'http://localhost:5173'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS')); // Block the origin
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
};

 
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute'); 
const planRoute = require('./routes/planRoute')

 
app.use('/api', authRoute);
app.use('/api', planRoute); 
app.use('/api/v1/product' , productRoute);


const port = process.env.SERVER_PORT;
app.listen(port , ()=>{ 
    console.log("server is runing on port : " + port);
});  