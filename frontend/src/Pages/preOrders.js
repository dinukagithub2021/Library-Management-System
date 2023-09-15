import { useState , useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { usePreOrdersContext } from "../hooks/usePreOrdersContext"

function PreOrders() {
    document.body.style.overflow = "hidden";

    const {user} = useAuthContext()
    const {preOrders, preOrdersdispatch} = usePreOrdersContext()
    const [errorFetch, setErrorFetch] = useState("")
    const [isApproving, setIsApproving] = useState(false)
    const [isReturning, setIsReturning] = useState(false)
    const [state, setState] = useState("Current")
    const [hasCurrentOrders, setHasCurrentOrders] = useState(false);
    const [hasApprovedOrders, setHasApprovedOrders] = useState(false);
    const [hasReturnedOrders, setHasReturnedOrders] = useState(false);


    useEffect(() => {
        if(user){
            fetchOrderedBooks()
        }
    }, [user])

    const fetchOrderedBooks = async() => {
        const response = await fetch('/api/preorders/', {
            method: 'GET',
            headers:{
                "Authorization" : `Bearer ${user.token}`
            }
        })
        const json  = await response.json()
        console.log(json)
        if(response.ok){
            preOrdersdispatch({type: 'SET_ORDERS', payload: json})
            setHasCurrentOrders(json.some(order => !order.isGiven));
            setHasApprovedOrders(json.some(order => order.isGiven && !order.isReturned));
            setHasReturnedOrders(json.some(order => order.isGiven && order.isReturned));
        }
        if(!response.ok){
            setErrorFetch(response.statusText)
        }
    }

    const returnOrders =  async(id) => {
        setIsReturning(true)
        const response = await fetch("/api/preorders/ordered/"+ id, {
            body: JSON.stringify({isGiven: true, isReturned: true}),
            method: 'PATCH',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(!response.ok){
            setErrorFetch(response.json)
        }
        if(response.ok){
            console.log(json)
            preOrdersdispatch({type: 'UPDATE_ORDER', payload: json.updatedPreOrder})
            fetchOrderedBooks()
        }
        const book = json.relBook
        const ID = book._id
        const remainingCopies = json.remainingCopies + 1
        const remainingCopiesInfo = {remainingCopies: remainingCopies};
        console.log(json)
        const bookResponse = await fetch("/api/books/"+ ID, {
            body: JSON.stringify(remainingCopiesInfo),
            method: 'PATCH',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const bookJson = await bookResponse.json()
        if(!bookResponse.ok){
            setErrorFetch(bookJson)
        }
        if(bookResponse.ok){
            preOrdersdispatch({type: 'UPDATE_BOOK', payload: json})
            fetchOrderedBooks()
        }

        setIsReturning(false)
    }

    const giveOrders =  async(id) => {
        setIsApproving(true)
        const response = await fetch("/api/preorders/ordered/"+ id, {
            body: JSON.stringify({isGiven: true, isReturned: false}),
            method: 'PATCH',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(!response.ok){
            setErrorFetch(json)
        }
        if(response.ok){
            preOrdersdispatch({type: 'UPDATE_ORDER', payload: json.updatedPreOrder})
            fetchOrderedBooks()
        }
        setIsApproving(false)
    }

    return (
    <div className="Lib-preorders">
        <div className="order-title">Pre Ordered Books</div>
        <div className="tab">
            <div className="tab-link" onClick={() => setState("Current")}>Current</div>
            <div className="tab-link" onClick={() => setState("Approved")}>Approved</div>
            <div className="tab-link" onClick={() => setState("Returned")}>Returned</div>
        </div>
        {isApproving && 
                    <div className="loading-msg">Approving...</div>
        }
        {isReturning && 
                    <div className="loading-msg">Loading...</div>
        }
        <div className="preorder-list">
            <div className={`Current ${state === "Current" ? "display" : "display-none"}`}>
                {!hasCurrentOrders && (
                    <div className="warning-msg">No Current Orders</div>
            )}
            </div>
            <div className={`Approved ${state === "Approved" ? "display" : "display-none"}`}>
                {!hasApprovedOrders && (
                    <div className="warning-msg">No Approved Orders</div>
            )}
            </div>
            <div className={`Returned ${state === "Returned" ? "display" : "display-none"}`}>
                {!hasCurrentOrders && (
                    <div className="warning-msg">No Returned Orders</div>
            )}
            </div>

        {preOrders &&  preOrders.length > 0 ? (
        preOrders.map((order) => {
                const isCurrent = !order.isGiven;
                const isApproved = order.isGiven && !order.isReturned;
                const isReturned = order.isGiven && order.isReturned;

                if ((state === "Current" && isCurrent) ||
                (state === "Approved" && isApproved) ||
                (state === "Returned" && isReturned)) {
                return (
                    <div className="order" key={order._id}>
                    <div className="order-pic">
                        <img src={`http://localhost:4000/${order.currentBook.coverImage}`} alt={order.currentBook.title} />
                    </div>
                    <div className="order-details">
                        <div className="order-name">{order.currentBook.title}</div>
                        <div className="order-author">Preorder Done By: {order.currentUser.name}</div>
                        {order.isGiven == false && 
                            <button className="order-borrow button-primary" onClick={() => giveOrders(order._id)}>Approve</button>
                        }
                        {order.isReturned == true && 
                            <div className="success-msg">Successfully Returned!</div>
                        }
                        {order.isReturned == false && 
                            order.isGiven == true && 
                                <button className="order-explore button-primary" onClick={() => returnOrders(order._id)}>Returned</button>
                        }
                    </div>
                    
                    </div>
                    
                )
        }
            return null
        })) : (
        <div className="warning-msg">No Pre-Ordered Books</div>
        )}
        </div>
    </div>
    );
}
 
export default PreOrders;