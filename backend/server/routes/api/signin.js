
const User= require('../../models/User');
const express=require('express');
const router=express.Router();

router.post("api/account/signup", (req, res, next) => {
    const { body } = req;
    const { firstName, lastName, email, password } = body;

    if (!firstName) {
        return res.send({
        success: false,
        message: "Error: First name cannot be blank "
      });
    }
    if (!lastName) {
        return res.send({
        success: false,
        message: "Error: Last name cannot be blank "
      });
    }
    if (!email) {
        return res.send({
        success: false,
        message: "Error: email name cannot be blank "
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: password name cannot be blank "
      });
    }

    email=email.toLowerCase();
    // 1 verify email doesn't exist
    // 2 save 

    User.find({
    email:email
    },(err,previousUsers)=>{
          if(err){
            return res.send({
                success: false,
                message: "Error: Server Error "
              });
          }else if(previousUsers.length>0){
            return res.send({
                success: false,
                message: "Error: User Already Exist"
              });
          }
    });
    // Save the new user 
    const newUser= new User();
    newUser.email=email;
    newUser.firstName=firstName;
    newUser.lastName=lastName;
    newUser.password= newUser.generateHash(password);

    newUser.save((err,user)=>{
          if(err){
            return res.send({
                success: false,
                message: "Error: Server ERROR"
              });
          }

          return res.send({
            success: true,
            message: "Signed Up"
          });
    })

  });
  module.exports=router;

