import { useAuthContext } from "../hooks/useAuthContext"
import { useBooksContext } from "../hooks/useBooksContext"
import { useState, useEffect } from "react"
import '../Styles/index.css'
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BookDetails = ({ book }) => {
    const [title, setTitle] = useState(book.title)
    const [author, setAuthor] = useState(book.author)
    const [copies, setCopies] = useState(Number(book.copies))
    const [description, setDescription] = useState(book.description)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isChanging, setIsChanging] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorFetch, setErrorFetch] = useState(false)
    const { user } = useAuthContext()
    const { dispatch } = useBooksContext()

    

    useEffect(() => {
        if(user){
            fetchAllBooks()
        }
    }, [user])

    const fetchAllBooks = async() => {
        const response = await fetch('/api/books')
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'SET_BOOKS', payload: json})
        }
        if(!response.ok){
            setErrorFetch(response.statusText)
        }
        

    }

    const handleDeleteClick = async () => {
        setIsDeleting(true)
        const response = await fetch('/api/books/' + book._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        setIsDeleting(false)
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_BOOK', payload: json })
        }
    }


    const editClick = async (e, book_id) => {
        e.preventDefault()
        const bookInfo = { title, author, copies: parseInt(copies, 10), description, remainingCopies: copies}
        setIsChanging(true)
        const Editresponse = await fetch('/api/books/' + book_id, {
            method: 'PATCH',
            body: JSON.stringify(bookInfo),
            headers: {
                'Content-type': 'Application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const Editjson = await Editresponse.json()
        if (Editresponse.ok) {
            closeModal()
            setIsSuccess(true)
            setTimeout(() => {
                setIsSuccess(false)
            }, 3000);
            dispatch({ type: 'UPDATE_BOOK', payload: Editjson })
            setIsChanging(false)
            fetchAllBooks()
        }
        if (!Editresponse.ok) {
            console.log(Editjson)
        }
    }


    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }



    return (
        <div className="single-book">
            {isSuccess && 
                <div className="success-msg">Successfully edited!</div>
            }
            {errorFetch && 
                <div className="error-msg">{errorFetch}</div>
            }
            <div className={`book ${isChanging ? "border-none" : ""}`} key={book._id}>
                <div className="book-image">
                    <img src={`http://localhost:4000/${book.coverImage}`}></img>
                </div>
                <div className="book-details">
                    {isDeleting &&
                        <div className="loading"></div>
                    }
                    <div className="delete"><span className="material-symbols-outlined" onClick={handleDeleteClick}>delete</span></div>
                    <div className="edit-symbol" onClick={openModal}><span className="material-symbols-outlined">edit</span></div>
                    <div className="book-name">{book.title}</div>
                    <div className="book-author">Written By: {book.author}</div>
                    <div className="copies">{book.remainingCopies} copies remaining</div>
                    <div className="description">"{book.description}"</div>
                    <div className="created-at">Created: {formatDistanceToNow(new Date(book.createdAt), {addSuffix: true})}</div>
                    <div className="created-at">Updated: {formatDistanceToNow(new Date(book.updatedAt), {addSuffix: true})}</div>
                </div>
                <div className={`edit-modal modal ${isModalOpen ? 'modal-open' : ''}`}>
                    <form className="edit" onSubmit={(e) => editClick(e, book._id)}>
                        <div className="title">Edit the Book</div>
                        <div className='Book-Title'>Book Title:<br /><input type='text' onChange={(e) => setTitle(e.target.value)} value={title}></input></div>
                        <div className='Book-Author'>Book Author<br /><input type='input' onChange={(e) => setAuthor(e.target.value)} value={author}></input></div>
                        <div className='Book-copies'>Book Copies:<br /><input type='number' onChange={(e) => setCopies(e.target.value)} value={copies}></input></div>
                        <div className='Book-description'>Book Description<br /><textarea onChange={(e) => setDescription(e.target.value)} value={description} rows={5} cols={70}></textarea></div>
                        <button className="button-primary" type="submit">Edit the Book</button>
                        {isChanging &&
                            <div className="loading-msg">Loading...</div>
                        }
                        <div className="close-button" onClick={closeModal}>x</div>
                    </form>
                </div>
                <div className={`overlay ${isModalOpen ? 'modal-open' : ''}`}></div>

            </div>
        </div>
    )
}

export default BookDetails