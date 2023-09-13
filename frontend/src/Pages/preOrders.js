import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { usePreOrdersContext } from "../hooks/usePreOrdersContext"

function PreOrders() {
    const {user} = useAuthContext()
    const {preOrders, preOrdersdispatch} = usePreOrdersContext()
    const [errorFetch, setErrorFetch] = useState("")
    const confirmOrders =  async(id) => {
        const response = await fetch("/api/preorders/ordered/"+ id, {
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
            preOrdersdispatch({type: 'UPDATE_ORDER', payload: json})
        }
    }


    return (
    <div className="Lib-preorders">
        <div className="order-title">Pre Ordered Books</div>
        <div className="preorder-list">
        {Array.isArray(preOrders) && preOrders.length > 0 ? (
        preOrders.map((order) => (
            <div className="order" key={order._id}>
            <div className="order-pic">
                <img src={`http://localhost:4000/${order.currentBook.coverImage}`} alt={order.currentBook.title} />
            </div>
            <div className="order-details">
                <div className="order-name">{order.currentBook.title}</div>
                <div className="order-author">By {order.currentBook.author}</div>
                <button
                className="order-explore button-primary" onClick={() => confirmOrders(order._id)}>Confirm</button>
            </div>
            </div>
        ))
        ) : (
        <div className="warning-msg">No Pre-Ordered Books</div>
        )}
        </div>
    </div>
    );
}
 
export default PreOrders;