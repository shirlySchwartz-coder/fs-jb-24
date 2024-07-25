import dal_mysql from "../DAL/dal_mysql";
import { Vacation } from "../Models/Vacation";

const addNewVacation = async (newVacation: Vacation)=>{ 
    console.log('in AddVacation')
    const sql = `
    INSERT INTO tagging_vacation.vacations (vacationId,destination, vacInfo, startDate, endDate, price)
    VALUES (${newVacation.vacationId}, '${newVacation.destination}','${newVacation.vacInfo}',
        ${newVacation.startDate}, ${newVacation.endDate},${newVacation.price},${newVacation.pictureUrl}
     );
    `;
   
    return await dal_mysql.execute(sql);
}

export {
    addNewVacation
}