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

    useEffect(() => {
        const fetchOrderedBooks = async() => {
            const response = await fetch('/api/preorders/ordered')
            const json  = await response.json()
            if(response.ok){
                preOrdersdispatch({type: 'SET_ORDERS', payload: json})
            }
            if(!response.ok){
                setErrorFetch(response.statusText)
            }
        }

        fetchOrderedBooks()
    }, [])

    

    const preOrderSubmit = async(id, userToken) => {
        console.log(id)
        // const formData  = new FormData()
        // formData.append("book_id", id)
        // formData.append("userToken", userToken)
        // formData.append("isReturned", false)
        // console.log(formData.get("userToken"))
        const requestBody = {
            book_id: id,
            userToken,
            isReturned: false,
          };
        
        const response = await fetch("/api/preorders", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers:{
                "Content-Type": "Application/json",
                'Authorization': `Bearer ${user.token}`
            }
        })

        // const responseData = await response.text(); // Get response as text, not JSON
        // console.log(responseData); // Log the response data
        const json = await response.json()
        console.log(json)
        console.log("request sent!")
        if(!response.ok){
            console.log("error")
        }
        if(response.ok){
            preOrdersdispatch({type: 'CREATE_ORDER', payload: json})
        }
    }

    return (
        <div className="User">
            <NavBarHome/>
            <div className="details">
                <div className="All-Books">
                    <div className="title">Pre-Ordered Books</div>
                    <div className="book-list">
                    {books && books.map((book) => (
                        <div className="book" key={book._id}>
                            <div className="book-pic">
                                <img src={`http://localhost:4000/${book.coverImage}`}></img>
                            </div>
                            <div className="book-details">
                                <div className="book-name">{book.title}</div>
                                <div className="book-author">By {book.author}</div>
                                <button className="book-explore button-primary" onClick={() => preOrderSubmit(book._id, user.token)}>Pre Order</button>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="preOrderedBooks">
                        <div className="title">Pre Ordered Books</div>
                        <div className="preorder-list">
                        {preOrders && preOrders.map((order) => (
                            <div className="book" key={order._id}>
                            <div className="book-pic">
                                <img></img>
                            </div>
                            <div className="book-details">
                                <div className="book-name"></div>
                                <div className="book-author">By </div>
                                <button className="book-explore button-primary">Delete</button>
                            </div>
                            </div>
                        ))}

                        </div>
                </div>
            </div>
        </div>
    );
}
 
export default User;