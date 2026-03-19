const mongoose = require('mongoose');


// Define the schema for the blacklist token
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, 'Token is required']
    }
}, { timestamps: true });

// Create the BlacklistToken model
const tokenBlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);


module.exports = tokenBlacklistToken;