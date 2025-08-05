import { useEffect, useState } from 'react';
import logo from '../../../Uploads/logo.png';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { store } from '../../../redux/store';
import { logoutAction } from '../../../redux/loginReducer';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function Header(): JSX.Element {
  const [isLogged, setLogged] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState('');

  store.subscribe(() => {
    setLogged(store.getState().login.jwt.length > 10);
    setName(store.getState().login.userName);
    //checkJWT();
  });
  useEffect(() => {
    const myJWT =
      localStorage.getItem('jwt') || sessionStorage.getItem('jwt') || '';
    //const myJWT = store.getState().login.jwt;
    if (myJWT.length > 10) {
      setLogged(myJWT?.length > 10);
      console.log('name:', name, 'isLogged:', isLogged);
    } else {
      store.dispatch(logoutAction());
      sessionStorage.clear();
      localStorage.clear();
      navigate('/login');
    }
  }, []);

  const logoutButton = () => {
    return (
      <>
        <input
          type='button'
          value='logout'
          onClick={() => {
            store.dispatch(logoutAction());
            toast.success('You are logged out.');
            localStorage.removeItem('jwt');
            sessionStorage.removeItem('jwt');
            navigate('/');
          }}
        />
      </>
    );
  };

  const loginButton = () => {
    return (
      <>
        <input
          type='button'
          value='login'
          onClick={() => {
            navigate('/login');
          }}
        />
        <input
          type='button'
          value='register'
          onClick={() => navigate('/register')}
        />
      </>
    );
  };

  return (
    <header className='Header'>
      <Row>
        <Col className='logo-img'>
          <img src={logo} alt='logo' className='img-logo-center' />
        </Col>

        <Col className='Title'>
          <h2 className='name'>Trip App</h2>
        </Col>
        <Col>
          <div>Hello {name}</div>
          
        </Col>
        <Col>
          <div>{isLogged ? logoutButton() : loginButton()}</div>
          </Col>
      </Row>
    </header>
  );
}
