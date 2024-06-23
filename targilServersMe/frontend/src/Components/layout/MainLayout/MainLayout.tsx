import { MainRoute } from "../../routes/MainRoute/MainRoute";
import MainFooter from "../MainFooter/MainFooter";
import MainHeader from "../MainHeader/MainHeader";
import MainMenu from "../MainMenu/MainMenu";
import MainPage from "../MainPage/MainPage";
import "./MainLayout.css";

function MainLayout(): JSX.Element {
    return (
        <div className="MainLayout">
			<header>
                <MainHeader/>
            </header>
            <aside>
                <MainMenu/>
            </aside>
            <main>
                <MainRoute/>
            </main>
            <footer>
                <MainFooter/>
            </footer>
        </div>
    );
}

export default MainLayout;
