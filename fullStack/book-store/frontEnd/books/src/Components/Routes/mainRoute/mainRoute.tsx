import "./mainRoute.css";
import { Route, Routes } from "react-router-dom";
import { Main } from "../../Layout/Main/Main";
import { AddAuthor } from "../../Pages/AddAuthor/AddAuthor";
import { AddBook } from "../../Pages/AddBook/AddBook";
import { AuthorsList } from "../../Pages/AuthorsList/AuthorsList";
import { BookList } from "../../Pages/BookList/BookList";
import { Page404 } from "../../Pages/Page404/Page404";

export function MainRoute(): JSX.Element {
   
    return (
        <div className="mainRoute">
					<Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/addBook" element={<AddBook/>}/>
                <Route path="/bookList" element={<BookList/>}/>
                <Route path="/addAuthor" element={<AddAuthor/>}/>
                <Route path="/authorsList" element={<AuthorsList/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}
