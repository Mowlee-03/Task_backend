const jwt=require("jsonwebtoken")

  const generateToken = (payload) => {
    console.log(payload)
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '2d'
    });
  };
  
  const verifyToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log({ status: 401, message: "Invalid Token", error });
      throw error; // Throw the error to be caught by the calling function
    }
  };

  module.exports={
    generateToken,
    verifyToken
  }