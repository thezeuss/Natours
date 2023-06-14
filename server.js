 require('dotenv').config({ path: './config.env' });;
const app = require('./app');
const connectDB = require('./config/db');

connectDB();


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
