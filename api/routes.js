require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');

//Routes
const reserveRoutes = require('./routes/reserveRoutes')
const userRoutes = require('./routes/userRoutes')
const authenticationRoutes = require('./routes/authenticationRoutes')
const merchantRoutes = require('./routes/merchantRoutes')
const inventoryRoutes = require('./routes/inventoryRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const packageRoutes = require('./routes/packageRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')
const forgetPasswordRoutes = require('./routes/forgetPasswordRoutes')

app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET","POST"],
    credentials: true,
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const allowedOrigins = [process.env.CORS_ORIGIN];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());
app.use('/',authenticationRoutes); //authentication
app.use('/user',userRoutes);  
app.use('/merchant',merchantRoutes);
app.use('/reserve',reserveRoutes);
app.use('/inventory',inventoryRoutes);
app.use('/payment',paymentRoutes);
app.use('/package',packageRoutes);
app.use('/feedback',feedbackRoutes);
app.use('/forgetPassword',forgetPasswordRoutes);

module.exports = app;