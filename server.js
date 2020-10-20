require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const blogRoutes = require('./src/routes/blogRoutes');
const bankRoutes = require('./src/routes/bankRoutes');
const worldBankRoutes = require('./src/routes/worldBankRoutes');
const generateAuth = require('./src/authentication/generateAuth');
const cors = require('cors');
require('./dbConfig');




const app = express();
app.use(cors());


const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/blog', blogRoutes);
app.use('/bank', bankRoutes);
app.post('/generateAuth', generateAuth);
app.use('/worldbank', worldBankRoutes);

app.listen(port, () => {
    console.log("Server running on the port " + port);
})

