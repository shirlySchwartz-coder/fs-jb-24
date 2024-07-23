import dal_mysql from "../DAL/dal_mysql";
import { UserCred } from "../Models/UserCred";

const getAllVacations = async ()=>{ 
    const sql = `
    SELECT vacationId ,destination, vacInfo , startDate, endDate, price, pictureUrl 
    FROM tagging_vacation.vacations
    `;
   
    return await dal_mysql.execute(sql);
}

const followVacation = async(userId: number,vacationId :number, isFollowed: boolean)=>{
    const sql = `
    INSERT INTO tagging_vacation.followers (userId, vacationId, isFollowed)
     VALUES (userId, vacationId, isFollowed)
    `;
   
    return await dal_mysql.execute(sql);
}

export {
    getAllVacations,
    followVacation
};