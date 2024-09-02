import { Vacation } from './../Models/Vacation';
import dal_mysql from '../DAL/dal_mysql';
import { getAllVacations } from './vacationLogic';

const addNewVacation = async (newVacation: Vacation) => {
  console.log('in AddVacation');
  console.log(newVacation);
  const start = newVacation.startDate.toDateString
  const end = newVacation.endDate.toDateString
  console.log(start,end);
  
  const sql = `
    INSERT INTO tagging_vacation.vacations (vacationId,destination, vacInfo, startDate, endDate, price, pictureUrl)
    VALUES (${newVacation.vacationId}, '${newVacation.destination}','${newVacation.vacInfo}',
        ${newVacation.startDate}, ${newVacation.endDate},${newVacation.price}, '${newVacation.pictureUrl}'
     );
    `;

  return await dal_mysql.execute(sql);
};

const updateVacation = async (vacationId: number, updateVac: Vacation) => {
  const sql = `
    UPDATE tagging_vacation.vacations
    SET destination ='${updateVac.destination}', vacInfo='${updateVac.vacInfo}',
    startDate = '${updateVac.startDate.toISOString()}', endDate = '${updateVac.endDate.toISOString()}', 
    price = ${updateVac.price}, pictureUrl = '${updateVac.pictureUrl}' 
    WHERE (vacationId = ${vacationId})
    `;

  return await dal_mysql.execute(sql);
};

const deleteVacation = async (id: number ) => {
  const sql = `
    DELETE FROM tagging_vacation.vacations
    WHERE vacationId = ${id};
  `;

  return await dal_mysql.execute(sql);
};
const getReports = async () => {
  console.log('getReports')
};

export { addNewVacation, updateVacation, deleteVacation, getReports };
