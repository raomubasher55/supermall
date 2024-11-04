require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use(express.json());
app.use(express.static('public'));

// CORS setup: allow specific origins based on environment
const corsOptions = {
  origin: ['https://supermall.digital' , 'http://localhost:5173/login'], // Only allow this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
};


app.use(cors());

// Routes
require('./service/orderCronJob');
const authRoute = require('./routes/authRoute'); 
const productRoute = require('./routes/productRoute');
const planRoute = require('./routes/planRoute');
const orderRoute = require('./routes/orderRoute');

app.use('/api', authRoute);
app.use('/api', planRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);

// Server setup
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
