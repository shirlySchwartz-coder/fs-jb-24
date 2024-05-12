import { UserCred } from "../Models/UserCred";
import { createJWT } from "../Utils/jwt";
const fs = require("fs");

const registerUser = (user:UserCred)=>{
    let userInfo;
    try{
         userInfo = JSON.parse(fs.readFileSync("users.data"));
    } catch (err){
         userInfo = [];
    }
    //check if user exists before saving the user.
    let singleUser = userInfo.find((item: { userName: string; })=>item.userName===user.userName);
    if (singleUser!==undefined){
        console.log("No such user ",singleUser)
        return "";
    }
    console.log(singleUser);
    if (user.userRole == undefined ) {
      user.userRole = "Guest";
    }
    //add the new user to our file
    userInfo.push(user);
    fs.writeFileSync("users.data",JSON.stringify(userInfo)  );
    let myJWT= createJWT(user)
    //console.log('myJWT-registerUser: ',myJWT)
    return myJWT ;
}

const loginUser = (user: UserCred) => {
     let userInfo;
     try {
       userInfo = JSON.parse(fs.readFileSync("users.data"));
     } catch (err) {
       userInfo = [];
     }
     //check the user and password send the password
     //return true / false
     let singleUser = userInfo.find(
       (item: { userName: string }) => item.userName === user.userName
     );
   
     //sending true/false if user data is o.k.
     //return singleUser.userName===user.userName && singleUser.userPass===user.userPass;
   
     //sending jwt if user data is o.k.
     if (
       singleUser.userName === user.userName &&
       singleUser.userPass === user.userPass &&
       singleUser.userRole === user.userRole
     ) {
       return createJWT(singleUser);
     } else {
       return "";
     }
   };
const forgotPassword = (userName:string)=>{
    let userInfo;
    try{
        userInfo = JSON.parse(fs.readFileSync("users.data"));
   } catch (err){
        userInfo = [];
   }
   //find the user...
   let singleUser = userInfo.find((item: { userName: string; })=>item.userName===userName);
   console.log(singleUser)
   if (singleUser===undefined){
        return "";
   }
   let myJWT=createJWT(singleUser)
   
  
   return myJWT;
   //send back the password....
}


export {
    registerUser,
    loginUser,
    forgotPassword
}