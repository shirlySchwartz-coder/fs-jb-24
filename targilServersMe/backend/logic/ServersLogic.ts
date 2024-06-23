import dal_mysql from "../DAL/dal_mysql";


const getAllServers = async()=>{
    //SQL statement
    const sql = `SELECT * FROM servers`;
    //execute the sql command
    const allSevers = await dal_mysql.execute(sql);
    //return the result
    return allSevers;
}

const setServerStatus = async(id:number,stat:number)=>{
    //SQL statement
    const sql = `UPDATE server SET server.stat=${stat}, time=${new Date()} WHERE id=${id}`;
    // execute the sql
    await dal_mysql.execute(sql);
    return;
}

export  {
  getAllServers,
  setServerStatus
}