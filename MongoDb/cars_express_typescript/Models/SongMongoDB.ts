import { Document,Schema,model } from "mongoose";
import { CatModel } from "./catMode_mongoDB";


//model interface describing the data in the model
export interface ISongModel extends Document{
    //don't specify the _id here !!!!
    url:string;
    title:string;
    songImg:string;
    category: Schema.Types.ObjectId; //foreign key to Category id
    videoFile:string;
}

const SongSchema = new Schema<ISongModel>(
    {
        //url,title,songImg, videoFile
        url:{
            type:String,
            required:[true,"missing URL"],
            minlength:[5,"URL too short"],
            maxlength:[255, "URL too long"],
            trim:true,
            unique:true
        },
        title:{
            type:String,
            required:[true,"missing title"],
            minlength:[5,"Title  is too short"],
            maxlength:[300, "Title  is too long"],
            trim:true,
            unique:false
        },
        songImg:{
            type:String,
            required:[true,"missing songImg"],
            minlength:[5,"Song Img short"],
            maxlength:[300, "Song Img long"],
            trim:true,
            unique:false
           
        },
        videoFile:{
            type:String,
            minlength:[5,"Video File  is too short"],
            maxlength:[300, "Video File  is too long"],
            trim:false,
            unique:true
        },
        category:{
            type: Schema.Types.ObjectId
        }

    },{
        versionKey: false 
    }
);