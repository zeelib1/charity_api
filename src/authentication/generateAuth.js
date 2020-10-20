const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid4 = require('uuid4');
const RefreshToken = require('../models/RefreshToken'); 
const cookie = require('cookie');


module.exports = async (req, res, next) => {
const { username, password } = req.body;     
try {
  const result =  await User.findOne({username})
  if(!result) {
      res.sendStatus(400)
      return;
  } 
const passwordMatch = await bcrypt.compare(password, result.password);
if(!passwordMatch) {
res.sendStatus(400);
return;
}
//now, generate acces token  - JWT
const access_token =  jwt.sign({ idUser: result._id }, process.env.PRIV_KEY, {expiresIn: 60});
//generate refresh token  - simple string, but UUID
const refresh_token = uuid4();
//save refresh token in db with the jwt linked
await RefreshToken.create({
    tokenValue:refresh_token,
     linkedJWT:access_token,
     idUser: result._id
    });

 // Send back both to the client
 res.setHeader("Set-Cookie", [
    cookie.serialize("access_token", String(access_token), {
      httpOnly: true,
    }),
    cookie.serialize("refresh_token", String(refresh_token), {
      httpOnly: true,
    }),
  ]);
  res.sendStatus(200);



} catch (e) {
    console.log(e);
    res.sendStatus(400);    
}


}