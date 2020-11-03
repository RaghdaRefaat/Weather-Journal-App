// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Post Route
app.post('/collectData', (req, res) => {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['feeling'] = req.body.feeling;
    res.send(projectData);
});

// Get the data
app.get('/allData',(req , res) => {
    res.send(projectData);
});

// Setup Server
const port = 3000;
const server = app.listen(port , (res,req)=>{
    console.log(`server is running from port + ${port}`);
});