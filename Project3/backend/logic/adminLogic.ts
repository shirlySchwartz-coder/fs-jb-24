import { Vacation } from './../Models/Vacation';
import dal_mysql from '../DAL/dal_mysql';
import { getAllVacations } from './vacationLogic';
import fs from 'fs';
import multer from 'multer';
   


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

const uploadPicture = async (file: any) => {
  console.log('file to save is:', file);
  console.log('uploadPicture start:', file);
   
  if (!file) {
    console.error('No file was uploaded.');
    return { error: 'No file was uploaded.' };
  }

  const uploadPath = __dirname + '/../temp/uploads/' + file.originalname; // Corrected path
  console.log('vacPicFile:', file, 'uploadPath:', uploadPath);

  // Save the file to the specified path
  return new Promise((resolve, reject) => {
    fs.rename(file.path, uploadPath, (err) => {
      if (err) {
        console.error('File upload failed:', err); // Log the error
        reject({ error: 'File upload failed.' });
      } else {
        resolve({ message: 'File uploaded successfully', fileName: file.originalname, filePath: uploadPath });
      }
    });
  });
};

export {
  addNewVacation,
  updateVacation,
  deleteVacation,
  getReports,
  uploadPicture,
};
