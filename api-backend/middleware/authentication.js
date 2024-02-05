const jwt = require('jsonwebtoken');


//middleware that handles authentication
//Provided a token in the body of the request

module.exports = (req, res, next) => {
    try{
        const info = jwt.verify(req.body.token, 'secret');
        next();
    }catch(err){
        return res.status(401).json({
            message: "Authentication failed"
        })
    }
}