/* Thushika Thavarajah (27516126)*/


//Step 1. Using jwt why? because it is easier to connect the frontend and the backend
const jwt = require('jsonwebtoken');

//Step 2. Create a function protect that runs on every protected route. 
const protect = (req, res, next) => {
const token = req.headers.authorization?.split(' ')[1];

    //If token does not exist, shall not pass!!!
    if (!token) {
    return res.status(401).json({ error: 'Not logged in' });
    }
    //If token is not valid, shall not pass
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is invalid' });
    }
};

module.exports = protect;