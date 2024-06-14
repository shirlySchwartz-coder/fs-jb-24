import { useState, useEffect } from "react";
import { Books } from "../../Models/Books";
import { SingleBook } from "../SingleBook/SingleBook";
import "./BookList.css";
import axios from "axios";

export function BookList(): JSX.Element {
    const [books,setBooks] = useState<Books[]>([]);
    useEffect(()=>{
        axios
        .get("http://localhost:8080/api/v1/books/all")
        .then(response=>response.data)
        .then(data=>{
            setBooks(data);
            console.log(data);
        });
    },[]);
    return (
        <div className="BookList">
			{books.map(item=><SingleBook key={item.bookId} book={item}/>)}
        </div>
    );
}
