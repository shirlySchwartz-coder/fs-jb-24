import { UserCred } from '../Models/UserCred';
import { createJWT } from '../Utils/jwt';
var fs = require('fs');

//register
const registerUser = (user: UserCred) => {

  let userInfo;
  try {
    userInfo = JSON.parse(fs.readFileSync('users.data'));
  } catch (err) {
    userInfo = [];
  }
  //check if user exists before saving the user.
  let singleUser = userInfo.find(
    (item: { userName: string }) => item.userName === user.userName
  );
  if (singleUser !== undefined) {
    console.log('User already exist ', singleUser);
    return '';
  }
  console.log(singleUser);

  //add the new user to our file
  userInfo.push(user);
  fs.writeFileSync('users.data', JSON.stringify(userInfo));
  let myJWT = createJWT(user);
  //console.log('myJWT-registerUser: ',myJWT)
  return myJWT;
};


//login
const loginUser = (user: UserCred) => {
/*  let {...tempUser} = user
  console.log("TempUser:", tempUser, tempUser.userName)
  console.log('user: ', user); */

  let userInfo;
  try {
    userInfo = JSON.parse(fs.readFileSync('users.data'));
  } catch (err) {
    userInfo = [];
  }
 
  let singleUser = userInfo.find(
    (item: { userName: string }) => item.userName === user.userName
  );

  if (singleUser === undefined) {
    console.log("User not found: ", user);
    return ''; // Explicitly return an empty string if user is not found
  }

  if (singleUser.userPass === user.userPass) {
    return createJWT(singleUser);
  } else {
    console.log('Invalid credentials for user: ', user);
    return '';
  }
};

//forgot password
const forgotPassword = (userName: string) => {
  let userInfo;
  try {
    userInfo = JSON.parse(fs.readFileSync('users.data'));
  } catch (err) {
    userInfo = [];
  }
  //find the user...
  let singleUser = userInfo.find(
    (item: { userName: string }) => item.userName === userName
  );
  console.log(singleUser);
  if (singleUser === undefined) {
    return '';
  }
  let myJWT = createJWT(singleUser);

  return myJWT;
  //send back the password....
};

export { registerUser, loginUser, forgotPassword };
