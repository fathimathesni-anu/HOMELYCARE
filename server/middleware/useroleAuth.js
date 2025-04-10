import jwt from "jsonwebtoken";

export const useroleAuth = (req, res, next) =>{
  try {
    const {token} = req.cookies;
    if(!token){
      return res.status(401).json({message:"userole not autherised",success: false});
    } 
    const tokenVerified = jwt.verify(token,process.env.JWT_SECRET_KEY);

    if(!tokenVerified){
      return res.status(401).json({message:"userole not autherised", success:false});
    }

    req.user = tokenVerified;
    next();
  } catch (error) {
    return res.status(401).json({message:error.message||"user autherization failed",success:false});
  }
};



