import { useEffect, useState, useSyncExternalStore } from "react";
import NavBarHome from "../Components/NavBarHome";
import { useBooksContext } from "../hooks/useBooksContext";
import {useAuthContext} from "../hooks/useAuthContext"
import "../Styles/books.css"
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import BookDetails from '../Components/BookDetails'

registerPlugin()

function Books() {
    const {books, dispatch} = useBooksContext()
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [copies, setCopies] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [error, setError] = useState('')
    const {user} = useAuthContext()
    const [isErrorOpen, setIsErrorOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorFetch, setErrorFetch] = useState('')
    const [success, SetSuccess] = useState('')
    const [isAdding, SetIsAdding] = useState(false)

    const handleFileChange = (fileItems) => {
        console.log(fileItems[0])
      if (fileItems.length > 0) {
        setCoverImage(fileItems[0].file);
      }
    };

    useEffect(() => {
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

        fetchAllBooks()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user){
            setError("You must be logged in!")
            return 
        }

        const formData = new FormData(); 
        formData.append('title', title);
        formData.append('author', author);
        formData.append('copies', copies);
        formData.append('description', description);
        formData.append('coverImage', coverImage);
        console.log(formData.get("title"))
        SetIsAdding(true)

        const response = await fetch('/api/books/', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(!response.ok){
            if(response.statusText == 'Bad Request'){
                setError("Fill out all the information!")
                setIsErrorOpen(true)
            }
            setTimeout(() => {
                setIsErrorOpen(false)
            }, 2500)
        }

        SetIsAdding(false)
        if(response.ok){
            setTitle('')
            setAuthor('')
            setCopies('')
            setDescription('')
            setCoverImage('')
            setError('')
            dispatch({type: 'CREATE_BOOK', payload: json})
            closeModal();
            closeError();
            SetSuccess("Uploaded the document")
            setTimeout(() => {
                SetSuccess("")
            }, 2500)
        }

    }

    function openModal() {
        setIsModalOpen(true);
    }
    
    function closeModal() {
     setIsModalOpen(false);
    }

    function openError(){
        setIsErrorOpen(true)
    }

    function closeError(){
        setIsErrorOpen(false)
    }

    function closeSuccess(){
        SetSuccess('')
    }



    




    return (
        
        <div className="AllBooks">
            <NavBarHome/>
            <div className="books-section">
                <div className={`BooksCollection`}>
                    <div className="books-title">Book Collection</div>
                    {errorFetch && 
                        <div className="error-fetch error-msg">{errorFetch}</div>
                    }
                    {success &&
                        <div className="success-msg">{success} <span onClick={closeSuccess}>x</span></div>
                    }
                    <button className="button-primary add-book" onClick={openModal}>Add a Book</button>
                    {books && books.map((book) => (
                        <BookDetails key = {book._id} book ={book}/>
                    ))}
                </div>
                <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
                    <form className="AddBook" onSubmit={handleSubmit}>
                        <h1>Add a Book</h1>
                        {error && 
                            <div className={`error-msg ${isErrorOpen ? 'open' : ''}`}>{error} <span onClick={closeError}>x</span></div>
                        }
                        <div className="AddBookDiv">
                            <div className='Book-Title'>Book Title:<br/><input type='text' onChange={(e) => setTitle(e.target.value)} value={title}></input></div>
                            <div className='Book-Author'>Book Author<br/><input type='input' onChange={(e) => setAuthor(e.target.value)} value={author}></input></div>
                            <div className='Book-copies'>Book Copies:<br/><input type='number' onChange={(e) => setCopies(e.target.value)} value={copies}></input></div>
                            <div className='Book-description'>Book Description<br/><textarea onChange={(e) => setDescription(e.target.value)} value={description} rows={5} cols={70}></textarea></div>
                            <FilePond
                                files={coverImage ? [{ source: coverImage }] : []}
                                onupdatefiles={handleFileChange}
                                allowMultiple={false}
                                acceptedFileTypes={['image/*']}
                                labelIdle='Drag & Drop your cover image or <span class="filepond--label-action">Browse</span>'
                                className='file-upload'
                            />
                            <button className="button-primary">Add the Book</button>
                            {isAdding && 
                                <div className="loading-msg">Loading........</div>
                            }
                        </div>
                        <span className="close-button" onClick={closeModal}>
                            X
                        </span>
                    </form>
                </div>
            </div>
            <div className={`overlay ${isModalOpen ? 'modal-open' : ''}`}></div>
        </div>
    );
}
 
export default Books;