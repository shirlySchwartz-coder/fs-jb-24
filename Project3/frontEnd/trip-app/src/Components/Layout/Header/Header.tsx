import './Header.css';
import logo from '../../Uploads/logo.png';

export function Header(): JSX.Element {
  return (
    <div className='Header'>
      <div >
        <img src={logo} width='100' height='50' alt='logo' className='img-logo-center' />
      </div>

      <div className='Titel'>
        <h2 className='name'>Trip App</h2>
      </div>
    </div>
  );
}
