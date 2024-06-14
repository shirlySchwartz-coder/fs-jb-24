import dal_mysql from '../dal/dal_mysql';

const getAllHosting = async ()=>{
    //sql statement
    const sql = "SELECT * FROM servers";
    //execute the sql statement
    return await dal_mysql.execute(sql);
}

export {getAllHosting};