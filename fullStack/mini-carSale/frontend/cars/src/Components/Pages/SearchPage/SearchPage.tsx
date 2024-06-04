import { useNavigate, useParams } from 'react-router-dom';
import './SearchPage.css';
import { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import SingleItem from '../SingleItem/SingleItem';
import { Car } from '../../model/Car';
import { CheckJWT } from '../../utils/JWT';
import { store } from '../../../redux/store';

function SearchPage(): JSX.Element {
  //list of url from data.gov.il
  // const URL_CAR =
  //  'https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=';
  const URL_SERVER = 'http://localhost:8080/api/v1/transport/';

  const URL_CAR = URL_SERVER + '/api/v1/transport/car/';
  const URL_BIKE = URL_SERVER + '/api/v1/transport/bike/';
  const URL_TRUCK = URL_SERVER + '/api/v1/transport/truck/';
  const URL_OFFROAD = URL_SERVER + '/api/v1/transport/offroad/';
  const URL_HANDICAP = URL_SERVER + '/api/v1/transport/handicap/';
  const URL_RECALL = URL_SERVER + '/api/v1/transport/recall/';

  const RESULT_LIMIT = 10;
  const  {vehicleType}  = useParams();
  const [myVtype, setVtype] = useState(vehicleType);
  const [carData, setData] = useState('');

  const [carResult, setResult] = useState<Car[]>([]);
  const [jwt, setJwt] = useState('');
  const navigate = useNavigate();

  store.subscribe(() => {
    setJwt(store.getState().auth.jwt)
  });
  
  //console.log("myVtype1: ", myVtype, " vechileType :" ,vehicleType, "params :", useParams())

  useEffect(() => {
    if (!CheckJWT()) {
      navigate('/login');
    }
    
     //setVtype('car')
  }, []);

 
  const getData = () => {
    switch (vehicleType) {
      case 'car':
        setVtype('car');
        break;
      case 'bike':
        setVtype('bike');
        break;
      case 'truck':
        setVtype('truck');
        break;
      case 'offroad':
        setVtype('offroad');
        break;
    }
  };
  
  const handleTextChange = (args: SyntheticEvent) => {
    let mySearch = (args.target as HTMLInputElement).value;
    setData(mySearch);
   
  };
  const handleSearch = async () => {
    console.log("myVtype :",myVtype)
    const headers = { Authorization: ` ${jwt}` };
    await axios.get(URL_SERVER+myVtype+`/` + carData, { headers }).then((res) => {
      let myData: Car[] = [];
      console.log('res:', res);
      let myResponse = res.data;
      for (let index = 0; index < myResponse.length; index++) {
        console.log(myResponse[index]);
        new Car(
          myResponse[index].baalut,
          myResponse[index].tozeret_nm,
          myResponse[index].kinuy_mishari,
          myResponse[index].sug_delek_nm,
          myResponse[index].mispar_rechev
        );
      }
      setResult(myResponse);
    });
  };
  return (
    <div className='SearchPage'>
      {vehicleType} locator
      <br />
      <hr />
      <div className='Box'>
        <input type='text' onChange={handleTextChange} />
        <input type='button' value={'search'} onClick={handleSearch} />
      </div>
      <hr />
      {carResult.map((item, index) => (
        <SingleItem key={index} carItem={item} />
      ))}
    </div>
  );
}

export default SearchPage;
