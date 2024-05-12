import axios from "axios";

//endpoints -> data.gov.il
const CAR_URL       = "https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=";
const BIKE_URL      = "https://data.gov.il/api/3/action/datastore_search?resource_id=bf9df4e2-d90d-4c0a-a400-19e15af8e95f&q=";
const TRUCK_URL     = "https://data.gov.il/api/3/action/datastore_search?resource_id=cd3acc5c-03c3-4c89-9c54-d40f93c0d790&q=";
const HANDICAP_URL  = "https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q=";
const OFFROAD_URL   = "https://data.gov.il/api/3/action/datastore_search?resource_id=f6efe89a-fb3d-43a4-bb61-9bf12a9b9099&q=";
const RECALL_URL    = "https://data.gov.il/api/3/action/datastore_search?resource_id=36bf1404-0be4-49d2-82dc-2f1ead4a8b93&q=";

//search by car number
const carInfo = async (id:string)=>{
    let myData = (await axios.get(CAR_URL+id)).data.result.records[0];
    //console.log(myData);
    return myData;
}

const bikeInfo = async (id:string)=>{
    let myData = (await axios.get(BIKE_URL+id)).data.result.records[0];
    return myData;
}

const truckInfo = async (id:string)=>{
    let myData = (await axios.get(TRUCK_URL+id)).data.result.records[0];
    return myData;
}

const handicapInfo = async (id:string)=>{
    let myData = (await axios.get(HANDICAP_URL+id)).data.result.records[0];
    return myData;
}

const offroadInfo = async (id:string)=>{
    let myData = (await axios.get(OFFROAD_URL+id)).data.result.records[0];
    return myData;
}

const recallInfo = async (id:string)=>{
    let myData = (await axios.get(RECALL_URL+id)).data.result.records[0];
    return myData;
}
//lists
const carList =async()=>{
    let myData = (await axios.get(CAR_URL+'&limit=5')).data.result.records;
    return myData;
}

const bikeList= async()=>{
    let myData = (await axios.get(BIKE_URL+'&limit=5')).data.result.records;
    return myData;
}
const truckList= async()=>{
    let myData = (await axios.get(TRUCK_URL+'&limit=5')).data.result.records;
    return myData;
}
const handicapList= async()=>{
    let myData = (await axios.get(HANDICAP_URL+'&limit=5')).data.result.records;
    return myData;
}

const offroadList= async()=>{
    let myData = (await axios.get(OFFROAD_URL+'&limit=5')).data.result.records;
    return myData;
}

const recallList= async()=>{
    let myData = (await axios.get(RECALL_URL+'&limit=5')).data.result.records;
    return myData;
}

export {
    carInfo,
    bikeInfo,
    truckInfo,
    handicapInfo,
    offroadInfo,
    recallInfo,

    carList,
    bikeList,
    truckList,
    handicapList,
    offroadList,
    recallList

}