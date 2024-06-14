import "./MainLayout.css";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { MainRoute } from "../../Routes/MainRoute/MainRoute";

export function MainLayout(): JSX.Element {
    return (
        <div className="MainLayout">
		<header>
            <Header/>
        </header>
        <menu>
            <Menu/>
        </menu>
        <main>
            <MainRoute/>
        </main>
        <footer>
            <Footer/>
        </footer>
        </div>
    );
}
