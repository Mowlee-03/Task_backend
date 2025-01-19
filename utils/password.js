const bcrypt=require("bcryptjs")

const hashPassword = (password) => {
    try {
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error('Error hashing password: ' + error.message);
    }
  };
  
  const verifyPasword=(password,comparepassword)=>{
    try {
      const verify=bcrypt.compare(password,comparepassword)
      return verify;
    } catch (error) {
      throw new Error("invalid password")
    }
  }

  module.exports={
    hashPassword,
    verifyPasword
  }




