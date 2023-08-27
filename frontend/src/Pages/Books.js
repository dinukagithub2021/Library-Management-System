import { useEffect, useState } from "react";
import "../Styles/books.css"

function Books() {

    const [books, setBooks] = useState(null)
    useEffect(() => {
        const fetchAllBooks = async() => {
            const response = await fetch('/api/books')
            const json = await response.json()

            if(response.ok){
                setBooks(json)
            }
        }

        fetchAllBooks()
    }, [])
    return (
        <div className="AllBooks">
            <div className="BooksCollection">
                {books && books.map((book) => (
                    <div className="book" key={book._id}>
                    <div className="book-image">
                        <img src={book.image}></img>
                    </div>
                    <div className="book-details">
                        <div className="book-name">{book.title}</div>
                        <div className="book-author">{book.author}</div>
                        <div className="rating">Rating : 4.1/5</div>
                        <div className="copies">{book.copies} copies remaining</div>
                        <button className="book-explore button-primary">Explore</button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}
 
export default Books;