const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");

const RefreshToken = require("../models/RefreshToken");

module.exports = async (req, res, next) => {
  // get cookies from the request
  const cookies = cookie.parse(req.headers.cookie || "");
  console.log(cookies);

  // verify the validity of the access token
  try {
    const at_validity = jwt.verify(cookies.access_token, process.env.PRIV_KEY);
      
  // valid: next
  if (at_validity) {
    next();
    return;
   }
  } catch (e) {
    // notValid: use refresh token create a new access token
  //        verify refresh is valid, create new jwt, create new refresh token, update in the database
  if(!cookies.refresh_token) {
    res.sendStatus(401);
    return;
  }
  const result = await RefreshToken.findOne({
    tokenValue: cookies.refresh_token,
  });
  if (!result) {
    res.sendStatus(401);
   return;
  }

  // Hacking  check
  // Checking the validity of jwt in the database
  // 1. the existence of it

  if(!result.linkedJWT){
    await RefreshToken.remove({_id:result._id});
    res.sendStatus(401);
  }

  //now verify the validity of the token, checking the payload, therefore that the token has not expired
try {
    const decryptedLinkedJWT = jwt.verify(result.linkedJWT, process.env.PRIV_KEY);
      //if the decrypted link is working, means the token has not expired, but the client has an issue
  //access token is responsible for accessing resources
  //we want to destroy refresh token and send back the status of 401
  if(decryptedLinkedJWT){
    await RefreshToken.remove({_id:result._id});
    res.sendStatus(401);
  }
} catch (error) {
   // Hacking check 
   console.log("Token has expired");

  // Generate access token - JWT
  const access_token = jwt.sign(
    { idUser: result.idUser },
    process.env.PRIV_KEY,
    {
      expiresIn: 60 * 5,
    }
  );
  // Generate refresh token - UUID4
  const refresh_token = uuid4();
  // Save refresh token in db with the jwt linked
  await RefreshToken.findOneAndUpdate(
    { tokenValue: cookies.refresh_token },
    {
      tokenValue: refresh_token,
      linkedJWT: access_token,
      idUser: result.idUser,
    }
  );
  // Send back both to the client
  res.setHeader("Set-Cookie", [
    cookie.serialize("access_token", String(access_token), {
      httpOnly: true,
    }),
    cookie.serialize("refresh_token", String(refresh_token), {
      httpOnly: true,
    }),
  ]);
  // send back the new values
  next();
  }
}



  


 

  
};
