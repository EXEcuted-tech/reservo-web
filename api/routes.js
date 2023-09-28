const express = require('express')
const app = express()
//Routes
const reserveRoutes = require('./routes/reserveRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(express.json());
app.use('/reserve',reserveRoutes);
app.use('/user',userRoutes);

module.exports = app;