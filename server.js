const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const PORT = 3000; 
app.listen(PORT, () => {
    console.log('Server is running on port $(PORT)');
});