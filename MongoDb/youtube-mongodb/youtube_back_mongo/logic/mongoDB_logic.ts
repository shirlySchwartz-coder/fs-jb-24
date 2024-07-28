import { error } from 'console';
//CRUD -> Create Read Update Delete

import { videoNotFound } from "../Models/ClientsErrors";
import { ISongModel } from "../Models/SongMongoDB";
import { ICatModel } from "../Models/catMode_mongoDB";


//Create (sql: insert into songs)
const addSong = (newSong:ISongModel):Promise<ISongModel> => {
    //before we sending data to the mongoDB, we need to validate the data
    const errors = newSong.validateSync(); 
    if (errors) throw new videoNotFound(errors.message);
    return newSong.save();
}

//create category new item
const addCat = (newCategory: ICatModel):Promise<ICatModel> =>{
    const error= newCategory.validateSync()
    if (error) throw new videoNotFound(error.message);
    return newCategory.save();
}

export {
    addSong,
    addCat,

}