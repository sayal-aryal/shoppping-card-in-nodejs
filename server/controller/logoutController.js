const users = require('../model/user');


exports.logOut=function(request,response){
    console.log('test123');
    console.log(request);
    const tokenId=request.headers['tokenId'];
    const tokenIndex=tokens.findIndex(token=>token.tokenId===tokenId);
    tokens.splice(tokenIndex, 1); 
    response.status(200).json({
        message: 'Successfully logged out'
    });    
}