import { UserCred } from '../Models/UserCred';
import { createJWT } from '../Utils/jwt';
var fs = require('fs');
import { ResultSetHeader } from 'mysql2';
import dal_mysql from '../DAL/dal_mysql';

//register
const registerUser = async (user: UserCred) => {
  let userInfo;
  try {
    //write to file
    // userInfo = JSON.parse(fs.readFileSync("users.data")); //writing to file, no validation
    //write to mysql
    const sql = `
        INSERT INTO users
        Values (0, '${user.userName}', '${user.userPass}','${user.userEmail}','${user.userRole}')
    `;
    const result: ResultSetHeader = await dal_mysql.execute(sql);
    console.log(`Created user with id:${result.insertId}`);
    user.id = +result.insertId;
  } catch (err) {
    return err;
  }
  //   //check if user exists before saving the user.
  //   let singleUser = userInfo.find(
  //     (item: { userName: string }) => item.userName === user.userName
  //   );
  //   if (singleUser !== undefined) {
  //     console.log(singleUser);
  //     return false;
  //   }
  //   console.log(singleUser);
  //   if (user.userRole === "") {
  //     user.userRole = "Guest";
  //   }
  //add the new user to our file
  //   userInfo.push(user);
  //   fs.writeFileSync("users.data", JSON.stringify(userInfo));
  return 'User was created';
};

//login from file
const loginUser = async (user: UserCred) => {
  let userInfo;
  try {
    //userInfo = JSON.parse(fs.readFileSync('users.data'));
    const sql = `
    SELECT * FROM northwind.users 
    WHERE userName= '${user.userName}' and userPass= '${user.userPass}'
    `;
    const [result] = await dal_mysql.execute(sql);
    //console.log('result in logic:', result);
    if (result) {
     
      const userInfo = {
        name: result.userName,
        email: result.userEmail,
        role: result.userRole,
        jwt: createJWT(result),
      };
      return userInfo;
    } else {
      return {
        name: '',
        email: '',
        role: 'GUEST',
        jwt: '',
      };
    }
  } catch (err) {
    //userInfo = [];
    return err;
  }
  //check the user and password send the password
  //return true / false
  /*let singleUser = userInfo.find(
    (item: { userName: string }) => item.userName === user.userName
  );*/
  //sending true/false if user data is o.k.
  //return singleUser.userName===user.userName && singleUser.userPass===user.userPass;
  //sending jwt if user data is o.k.
  /*try {
    if (singleUser.userPass === user.userPass) {
      const userInfo = {
        name: singleUser.userName,
        email: singleUser.userEmail,
        role: singleUser.userRole,
        jwt: createJWT(singleUser),
      };
      return userInfo;
    } else {
      return {
        name: '',
        email: '',
        role: 'GUEST',
        jwt: '',
      };
    }
  } catch (err) {
    console.log('no user found');
  }*/
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
//delete user
const deleteUser = async (userId: number) => {
  try {
    const sql = `DELETE FROM users WHERE id=${userId}`;
    console.log(sql);
    await dal_mysql.execute(sql);
    return true;
  } catch (err) {
    console.log(err);
  }
};
export { registerUser, loginUser, forgotPassword, deleteUser };
