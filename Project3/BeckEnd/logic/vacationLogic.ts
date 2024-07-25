import dal_mysql from "../DAL/dal_mysql";
import { UserCred } from "../Models/UserCred";

const getAllVacations = async ()=>{ 
    const sql = `
    SELECT vacationId ,destination, vacInfo , startDate, endDate, price, pictureUrl 
    FROM tagging_vacation.vacations
    `;
   
    return await dal_mysql.execute(sql);
}

const followVacation = async(userId: number,vacationId :number)=>{
    const sql = `
    INSERT INTO  tagging_vacation.followers(idFollower,idVacation) VALUES (${userId},${vacationId}) ;
    `;
   
    return await dal_mysql.execute(sql);
}
const unFollowVacation = async(userId: number,vacationId :number)=>{
    const sql = `
    DELETE FROM  tagging_vacation.followers WHERE idFollower=${userId} 
    AND idVacation=${vacationId} ;
    `;
   
    return await dal_mysql.execute(sql);
}

export {
    getAllVacations,
    followVacation,
    unFollowVacation
};