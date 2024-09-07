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
  origin: ['https://supermall.digital', 'http://localhost:5173'], // Add any allowed origins here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
  allowedHeaders: ['Authorization', 'Content-Type'], // Allowed headers
  credentials: true // Enable Access-Control-Allow-Credentials
};

app.use(cors(corsOptions));

 
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