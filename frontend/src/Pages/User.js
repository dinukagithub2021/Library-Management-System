import NavBarHome from "../Components/NavBarHome";
import '../Styles/user.css';
import '../Styles/index.css'
import { useEffect, useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePreOrdersContext } from "../hooks/usePreOrdersContext";


function User() {
    const {user} = useAuthContext()
    const {books, dispatch} = useBooksContext()
    const {preOrders, preOrdersdispatch} = usePreOrdersContext()
    const [errorFetch, setErrorFetch] = useState()
    const [isFetchingAllBooks, setIsFetchingAllBooks] = useState(false)
    const [isPreOrdering, setIsPreOrdering] = useState(false) //process of uploading
    const [isPreOrdered, setIsPreOrdered] = useState(false)  //success
    const [isInTheBooksTab, setIsInTheBooksTab] = useState(true)
    const [isFetchingPreOrdered, setIsFetchingPreOrdered]= useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [isPreOrderedThere, setIsPreOrderedThere] = useState(false)

    useEffect(() => {
        fetchAllBooks()
    }, [])

    useEffect(() => {
        if(user){
            fetchOrderedBooks()
        }
    }, [user])

    const fetchAllBooks = async() => {
        const response = await fetch('/api/books', {
            method:'GET',
            headers: {
                "Content-type": "Application/json"
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'SET_BOOKS', payload: json})
            setIsFetchingAllBooks(true)
        }
        if(!response.ok){
            setErrorFetch(response.statusText)
        }
    }

    const fetchOrderedBooks = async() => {
        const response = await fetch('/api/preorders/ordered', {
            method: 'GET',
            headers:{
                "Authorization" : `Bearer ${user.token}`
            }
        })
        const json  = await response.json()
        if(response.ok){
            preOrdersdispatch({type: 'SET_ORDERS', payload: json})
            if(json){
                setIsPreOrderedThere(true)
            }else{
                setIsFetchingPreOrdered(false)
            }
        }
        if(!response.ok){
            setErrorFetch(response.statusText)
        }
    }


    const preOrderSubmit = async(id, userToken, remainingCopies) => {
        setIsPreOrdered(false)
        if(!user){
            setErrorFetch("You must be logged in!")
        }
        const requestBody = {
            book_id: id,
            userToken,
            isGiven: false,
            isReturned: false,
        };

        setIsPreOrdering(true)

        const response = await fetch("/api/preorders", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers:{
                "Content-Type": "Application/json",
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(!response.ok){
            setIsPreOrdering(false)
            setErrorFetch(json)
            setTimeout(() => {
                setErrorFetch("")
            }, 3000)
        }
        if(response.ok){
            setIsPreOrdered(true)
            preOrdersdispatch({type: 'CREATE_ORDER', payload: json})
            fetchOrderedBooks()
            setIsFetchingPreOrdered(true)
            setIsPreOrdering(false)

            const remainingCopiesInfo = {remainingCopies: remainingCopies-1}

            const bookResponse = await fetch("/api/books/"+ id, {
                method: 'PATCH',
                body: JSON.stringify(remainingCopiesInfo),
                headers:{
                    "Content-Type": "Application/json",
                    'Authorization': `Bearer ${user.token}`
                }
            })
    
            const bookJson = await bookResponse.json()
            if(bookResponse.ok){
                dispatch({type: 'UPDATE_BOOK', payload: json})
            }
            fetchAllBooks()
        }

    }

    const deleteHandle = async(id) => {
        setIsDeleting(true)
        const response = await fetch("/api/preorders/ordered/" + id, {
            method: 'DELETE',
            headers: {
                "authorization": `Bearer ${user.token}`
            }
        })
        setIsDeleting(false)
        const json = await response.json()
        console.log(json)
        if(!response.ok){
            console.log("Error in deleting preorders")
        }
        if(response.ok){
            console.log(json.currentBook)
            preOrdersdispatch({type: 'DELETE_ORDER', payload: json.currentOrder})
            fetchOrderedBooks()
            setIsDeleted(true)
            setIsPreOrderedThere(false)
            setTimeout(() => {
                setIsDeleted(false)
            }, 3000)

            const remainingCopies = json.remainingCopies;
            const remainingCopiesInfo = {remainingCopies: remainingCopies}
            const relBook = json.relBook
            const ID = relBook._id

            const bookResponse = await fetch("/api/books/"+ ID, {
                method: 'PATCH',
                body: JSON.stringify(remainingCopiesInfo),
                headers:{
                    "Content-Type": "Application/json",
                    'Authorization': `Bearer ${user.token}`
                }
            })
    
            const bookJson = await bookResponse.json()
            if(bookResponse.ok){
                dispatch({type: 'UPDATE_BOOK', payload: bookJson})
            }
        }
        fetchAllBooks()
    }

    function booksTab(){
        setIsInTheBooksTab(true)
    }

    function preOrderedTab(){
        setIsInTheBooksTab(false)
        setIsPreOrdered(false)
        setIsFetchingPreOrdered(true)
        fetchOrderedBooks()
    }

    return (
        <div className="User">
            <NavBarHome/>
            <div className="details">
                <div className="tab">
                    <button className="tab-link" onClick={booksTab}>All Books</button>
                    <button className="tab-link" onClick={preOrderedTab}>PreOrdered Books</button>
                </div>
                <div className={`section ${isInTheBooksTab ? "display" : "display-none"}`}>
                <div className="title">All Books</div>
                {isPreOrdering && (
                    <div className="warning-msg">Submitting....</div>
                )}
                {isPreOrdered && (
                    <div className="success-msg">Check the PreOrder Tab for your successful submission!</div>
                )}
                {errorFetch && (
                        <div className="error-msg">{errorFetch}</div>
                )}
                {isFetchingAllBooks && (
                    <div className="All-Books">
                    <div className="book-list">
                    {books.length > 0 && books.map((book) => (
                        <div className="book" key={book._id}>
                            <div className="book-pic">
                                <img src={`http://localhost:4000/${book.coverImage}`}></img>
                            </div>
                            <div className="book-details">
                                <div className="book-name">{book.title}</div>
                                <div className="book-author">By {book.author}</div>
                                <div className="book-copies">Remaining Copies: {book.remainingCopies}</div>
                                <button className="book-explore button-primary" onClick={() => preOrderSubmit(book._id, user.token,book.remainingCopies)}>Pre Order</button>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}: {(
                    <div className={`warning-msg ${isFetchingAllBooks ? "display-none" : "display"}`}>Loading the Book Collection....</div>
                )}
                </div>

                <div className={`section ${isInTheBooksTab ? "display-none" : "display"}`}>
                <div className="title">Pre Ordered Books</div>
                {!isPreOrderedThere && (
                    <div className="warning-msg">No Preordered Books</div>
                )}
                {isFetchingPreOrdered && (
                    <div className="preOrderedBooks">
                    {isDeleted && (
                        <div className="success-msg">Successfully Deleted!</div>
                    )}
                    <div className="preorder-list">
                    {preOrders.length > 0 &&
                    preOrders.map((order) => (
                        <div className="order" key={order._id}>
                        <div className="order-pic">
                            <img src={`http://localhost:4000/${order.currentBook.coverImage}`} alt={order.currentBook.title} />
                        </div>
                        <div className="order-details">
                            <div className="order-name">{order.currentBook.title}</div>
                            <div className="order-author">By {order.currentBook.author}</div>
                            {isDeleting ? (
                                <div className="loading"></div>
                            ): (
                                <div className="delete"><span className="material-symbols-outlined" onClick={() => deleteHandle(order._id)}>delete</span></div>
                            )}
                        </div>
                        </div>
                    ))
                    }
                    </div>
            </div>
                )}: {(
                    <div className={`warning-msg ${isFetchingAllBooks ? "display-none" : "display"}`}>Loading the PreOrdered Books.......</div>
                )}

                </div>
            </div>
        </div>
    );
}

export default User;