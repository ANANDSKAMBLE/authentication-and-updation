const http=require('http');

const auth=require('C:/Users/Anand S Kamble/Desktop/html/authentication/auth.js');
const updateInfo=require('C:/Users/Anand S Kamble/Desktop/html/updateInformation/updateInfo');
const express=require('express');
const port = 3001;
const app = express();

// Route for authentication functionality
app.use('/auth', auth);

// Route for updateInfo functionality
app.use('/updateInfo', updateInfo);

// Handle other routes or return a 404 error
app.use((req, res) => {
    res.status(404).json({"message":"not found"});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports=app;