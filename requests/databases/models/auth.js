const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function verifyUser(request, response, next){
    const token = request.header('Authorization');
    if(!token){
        return response.status(400).json({message: 'Please provide a token'})
    }
    
    try {
        const verified_token = jwt.verify(token, 'thisIsMyEncryptionKey');
        console.log(verified_token);
        next(); //middleware to tell you to proceed so nothing gets stuck in the API
    } catch(errors){
        return response.json(errors);
    }
}
module.exports = verifyUser;