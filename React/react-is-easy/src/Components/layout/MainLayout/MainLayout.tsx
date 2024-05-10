import  Login  from '../Login/Login';
import MainFooter from '../MainFooter/MainFooter';
import MainHeader from '../MainHeader/MainHeader';
import MainMenu from '../MainMenu/MainMenu';
import './MainLayout.css';

function MainLayout(): JSX.Element {
  return (
    <div className='MainLayout'>
      <head>
        <MainHeader />
      </head>
      <aside>
        <MainMenu />
      </aside>
      <main>
        <Login />
      </main>
      <footer>
        <MainFooter />
      </footer>
    </div>
  );
}
export default MainLayout;
