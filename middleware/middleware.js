const jwt=require('jsonwebtoken');

module.exports =function(req,res,next){
      const authHeader=req.header('Authorization');

      if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message:'Access Denied'})
      }

      const token=authHeader.split()[1];

      try{
        const decoded=jwt.verify(token,'JWT_SECERET_KEY');
        req.user=decoded;
        next();
      }
      catch(error){
        res.status(401).json({message:"Invalid or expire token"})
      }
}
