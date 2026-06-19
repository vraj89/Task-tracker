const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const User=new mongoose.Schema({
      email:{
         type:String,
         required:true,
         unique:true,
         trim:true,
         lowercase:true,

      },
      password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
      },

})

User.pre('save',async function(next){
     if(!this.isModified('password')) return next();
     const salt=await becrypt.genSalt(10);
     this.password()=await becrypt.hash(this.password,salt);
})

module.exports=mongoose.model('User',User)