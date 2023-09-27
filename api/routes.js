const express = require('express')
const app = express()
//Routes
const reserveRoutes = require('./routes/reserveRoutes')

app.use(express.json());
app.use('/reserve',reserveRoutes);

module.exports = app;