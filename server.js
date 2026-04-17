require ('dotenv').config() // Load environment variables from .env file
const app = require('./src/app'); // Import your Express app
const connectDB = require('./src/config/database'); // Import the function to connect to MongoDB
// Connect to MongoDB
connectDB();

app.listen(3000, () => {
  console.log('Server is running on port 3000 http://localhost:3000');
});

module.exports = app;