import { useAuthContext } from "../hooks/useAuthContext"
import { useBooksContext } from "../hooks/useBooksContext"
import { useState } from "react"

const BookDetails = ({book}) => {

    const [isDeleting, setIsDeleting] = useState(false)
    const {user} = useAuthContext()
    const {dispatch} = useBooksContext()
    const handleDeleteClick = async() => {
        setIsDeleting(true)
        const response = await fetch('/api/books/' + book._id , {
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        setIsDeleting(false)
        const json = await response.json()
        if(response.ok){
            dispatch({type : 'DELETE_BOOK', payload : json})
        }
    }



    return (
        <div className="book" key={book._id}>
            <div className="book-image">
                <img src={`http://localhost:4000/${book.coverImage}`}></img>
            </div>
            <div className="book-details">
                {isDeleting && 
                    <div className="loading"></div>
                }
                <div className="delete"><span className="material-symbols-outlined" onClick={handleDeleteClick}>delete</span></div>
                <div className="book-name">{book.title}</div>
                <div className="book-author">Written By: {book.author}</div>
                <div className="rating">Rating : -</div>
                <div className="copies">{book.copies} copies remaining</div>
                <button className="book-explore button-primary">Explore</button>
            </div>
        </div>
    )
}

export default BookDetails