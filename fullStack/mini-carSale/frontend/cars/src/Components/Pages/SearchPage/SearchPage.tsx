import { useNavigate, useParams } from 'react-router-dom';
import './SearchPage.css';
import { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import SingleItem from '../SingleItem/SingleItem';
import { Car } from '../../model/Car';
import { CheckJWT } from '../../utils/JWT';
import { store } from '../../../redux/store';

function SearchPage(): JSX.Element {
  let {vechileType} = useParams();
  const [cardType, setCardType] = useState('');
  const [carData, setData] = useState('');
  const [carResult, setResult] = useState<Car[]>([]);
  const [jwt, setJwt] = useState('');
  const navigate = useNavigate();
 
  const URL_SERVER = 'http://localhost:8080/api/v1/transport/';
  const RESULT_LIMIT = 10;
    

  store.subscribe(() => {
    setJwt(store.getState().auth.jwt)
  });

  useEffect(() => {
    if (!CheckJWT()) {
      navigate('/login');
    }  
    //if (vechileType) setCardType(vechileType)
  }, [vechileType]);

 
 
  const handleTextChange = (args: SyntheticEvent) => {
    let mySearch = (args.target as HTMLInputElement).value;
    setData(mySearch);
   
  };
  const handleSearch = async () => {
    
    const headers = { Authorization: ` ${jwt}` };
    await axios.get(URL_SERVER+vechileType+`/` + carData, { headers })
    .then((res) => {
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
      {vechileType} locator
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
