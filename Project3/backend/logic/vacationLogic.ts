import { Vacation } from './../Models/Vacation';
import dal_mysql from '../DAL/dal_mysql';
import { UserCred } from '../Models/UserCred';

const getAllVacations = async () => {
  const sql = `
    SELECT vacationId ,destination, vacInfo , 
DATE_FORMAT(startDate, "%d-%m-%Y") , DATE_FORMAT(endDate, "%d- %m- %Y") , price, pictureUrl 
    FROM tagging_vacation.vacations
    `;

  return await dal_mysql.execute(sql);
};

const getVacationById = async (vacationId: number) => {
  const sql = `
    SELECT *
    FROM tagging_vacation.vacations
    WHERE (vacationId = ${vacationId})
    `;

  return await dal_mysql.execute(sql);
};

const followVacation = async (userId: number, vacationId: number) => {
  const sql = `
    INSERT INTO  tagging_vacation.followers(idFollower,idVacation) 
    VALUES (${userId},${vacationId}) ;
    `;

  return await dal_mysql.execute(sql);
};
const unFollowVacation = async (userId: number, vacationId: number) => {
  const sql = `
    DELETE FROM  tagging_vacation.followers WHERE idFollower=${userId} 
    AND idVacation=${vacationId} ;
    `;

  return await dal_mysql.execute(sql);
};

export { getAllVacations, getVacationById, followVacation, unFollowVacation };
