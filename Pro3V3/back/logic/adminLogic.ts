import { Vacation } from './../Models/Vacation';
import dal_mysql from '../DAL/dal_mysql';
import fs from 'fs';
import multer from 'multer';

const uploadPicture = async (file: any, id: number) => {
  let url = `http://localhost:8080/${file.destination}/${file.filename}`;
  let vacId = +id;

  const sql = `
  UPDATE tagging_vacation.vacations
   SET pictureUrl = '${url}' WHERE (vacationId = ${vacId});
  `;
  return await dal_mysql.execute(sql);
};

const addNewVacation = async (newVacation: Vacation) => {
  const start = new Date(newVacation.startDate).toISOString().slice(0, 10);
  const end = new Date(newVacation.endDate).toISOString().slice(0, 10);

  const sql = `
    INSERT INTO tagging_vacation.vacations ( destination, vacInfo, startDate, endDate, price)
    VALUES ( '${newVacation.destination}', '${newVacation.vacInfo}',
      STR_TO_DATE('${start}', "%Y-%m-%d"), STR_TO_DATE('${end}', "%Y-%m-%d"), ${newVacation.price}
     )    
    `;
  await dal_mysql.execute(sql);

  const result = await dal_mysql.execute('SELECT LAST_INSERT_ID() as id');
  return result[0].id;
};

const getVacationById = async (vacationId: number) => {
  const sql = `SELECT * FROM tagging_vacation.vacations where vacationId=1`;
  return await dal_mysql.execute(sql);
};

const updateVacation = async (vacationId: number, updateVac: Vacation) => {
  const vacInfoReq = updateVac.vacInfo;

  const sql = `
    UPDATE tagging_vacation.vacations
    SET destination ='${updateVac.destination}', vacInfo='${vacInfoReq}',
    startDate = STR_TO_DATE('${updateVac.startDate}', "%Y-%m-%d"), 
    endDate = STR_TO_DATE('${updateVac.endDate}', "%Y-%m-%d"), 
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
 
  const sql = `
    SELECT idVacation as vacId ,destination as place , count(idVacation) as followers
    FROM tagging_vacation.followers
    left join  vacations on vacationId=idVacation
    group by  idVacation
    order by followers desc 
    limit 10 ;;
  `;

  return await dal_mysql.execute(sql);
};



export {
  addNewVacation,
  updateVacation,
  deleteVacation,
  getReports,
  uploadPicture,
  getVacationById,
};
