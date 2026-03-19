const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema ({
    username:{
        type: String,
        required: true,
        unique: [ true, 'Username already exists' ],

    },

    email: {
        type: String,
        unique: [ true, 'Email already exists' ],
        required: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address' ]
    },

    password: {
        type: String,
        required: true,
        minlength: [ 6, 'Password must be at least 6 characters long' ]
    }
})

// Create the User model
const User = mongoose.model('User', userSchema);


// Export the User model
module.exports = User;