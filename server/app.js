const express = require('express');
const cors = require('cors');
const app = express();

const productRouter = require('./routes/productRouter');
 const loginRouter = require('./routes/loginRouter');
 const logoutRouter = require('./routes/logoutRouter');
console.log("inside app.js line 8")
app.use(express.json());
app.use(cors());
app.use('/products',productRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
