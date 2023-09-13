import { BooksContext } from "../context/booksContext";
import { useContext } from "react";

export const useBooksContext = () => {
    const context = useContext(BooksContext)
    if(!context){
        throw Error("Hi, this is an error")
    }
    return context
}