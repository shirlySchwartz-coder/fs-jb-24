import { UserCred } from '../Models/UserCred';
import { createJWT } from '../Utils/jwt';
import { ResultSetHeader } from 'mysql2';
import dal_mysql from '../DAL/dal_mysql';
import { UserReg } from '../Models/UserReg';

//register
const registerUser = async (user: UserReg) => {
  //let userInfo;
  try {
    const sql = `
        INSERT INTO users
        Values 
        (0, '${user.userFirstName}', '${user.userLastName}',
        '${user.userEmail}','${user.userPassword}',
         '${user.isAdmin}')
    `;
    const result: ResultSetHeader = await dal_mysql.execute(sql);

    return  await +result.insertId;
  } catch (err) {
    return err;
  }

  return 'User was created';
};

//login from file
const loginUser = async (user: any) => {
  try {
    const sql = `
    SELECT  userId, CONCAT_WS(" ", userFirstName , userLastName) As userName, userEmail, isAdmin  
    FROM tagging_vacation.users
    WHERE userEmail='${user.email}' and userPassword=${user.password};
    `;

    const [result] = await dal_mysql.execute(sql);

    if (result) {
      const userInfo = {
        userId: result.userId,
        userName: result.userName,
        userEmail: result.userEmail,
        isAdmin: result.isAdmin,
        jwt: createJWT(result),
      };
      return await userInfo;
    } else {
      return 'user dose not exist';
    }
  } catch (err) {
    //userInfo = [];
    return err;
  }
};

//delete user
const deleteUser = async (userId: number) => {
  try {
    const sql = `DELETE FROM users WHERE id=${userId}`;
      
    const result =await dal_mysql.execute(sql);
    return await result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const forgotPassword = async (userName: string) => {
  try {
    const sql = `SELECT userPassword FROM users WHERE userName='${userName}'`;
    const [result] = await dal_mysql.execute(sql);
    if (result.length > 0) {
      return await result[0].userPassword; 
    } else {
      return 'User not found'; 
    }
  } catch (error) {
    console.log(error);
    return 'Error retrieving password'; 
  }
};
export { registerUser, loginUser, deleteUser, forgotPassword };


