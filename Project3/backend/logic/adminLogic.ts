import { Vacation } from './../Models/Vacation';
import dal_mysql from '../DAL/dal_mysql';
import { getAllVacations } from './vacationLogic';

const addNewVacation = async (newVacation: Vacation) => {
  console.log('in AddVacation');
  console.log(newVacation);
  const start = new Date(newVacation.startDate).toISOString().slice(0, 10);
  const end = new Date(newVacation.endDate).toISOString().slice(0, 10);
  //console.log('start, end:', start,end);
  const sql = `
    INSERT INTO tagging_vacation.vacations (vacationId, destination, vacInfo, startDate, endDate, price)
    VALUES (${newVacation.vacationId}, '${newVacation.destination}', '${newVacation.vacInfo}',
      STR_TO_DATE('${start}', "%Y-%m-%d"), STR_TO_DATE('${end}', "%Y-%m-%d"), ${newVacation.price}
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

const deleteVacation = async (id: number) => {
  const sql = `
    DELETE FROM tagging_vacation.vacations
    WHERE vacationId = ${id};
  `;

  return await dal_mysql.execute(sql);
};
const getReports = async () => {
  console.log('getReports');
};

const uploadPicture = async (file: File) => {
  console.log('file to save is:', File);
};

export {
  addNewVacation,
  updateVacation,
  deleteVacation,
  getReports,
  uploadPicture,
};
