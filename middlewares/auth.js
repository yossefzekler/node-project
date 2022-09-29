const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
   
    try {
        //get the token
        let token = req.headers('authorization')
        if (!token) return res.status(401).send('access denied.no token provided');

        //chek the token 
        let payload = jwt.verify(token, process.env.secretKey)

        // save the payload
        req.payload = payload;
        next();
    }
    catch (error) {
        res.status(400).send('INVALID TOKEN');
    }
   
};