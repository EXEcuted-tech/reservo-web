const express = require('express')
const app = express()
//Routes
const reserveRoutes = require('./routes/reserveRoutes')
const userRoutes = require('./routes/userRoutes')
const authenticationRoutes = require('./routes/authenticationRoutes')
const merchantRoutes = require('./routes/merchantRoutes')
const inventoryRoutes = require('./routes/inventoryRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const packageRoutes = require('./routes/packageRoutes')

app.use(express.json());
app.use('/',authenticationRoutes); //authentication
app.use('/user',userRoutes);  
app.use('/merchant',merchantRoutes);
app.use('/reserve',reserveRoutes);
app.use('/inventory',inventoryRoutes);
app.use('/payment',paymentRoutes);
app.use('/package',packageRoutes);

module.exports = app;