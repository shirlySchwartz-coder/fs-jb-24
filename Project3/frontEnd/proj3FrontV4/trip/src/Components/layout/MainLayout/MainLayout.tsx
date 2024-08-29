import { MainRoute } from '../../routes/mainRoute/mainRoute';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { MainMenu } from '../MainMenu/MainMenu';
import './MainLayout.css';

export function MainLayout(): JSX.Element {
  return (
    <div className='MainLayout'>
      <header>
        <Header />
      </header>
      <aside>
        <MainMenu/>
      </aside>
      <main>
        <MainRoute/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}
