import {createContext, useReducer} from "react"

export const PreOrdersContext = createContext()

export const PreOrderReducer = (state,action)=> {
    switch (action.type){
        case 'SET_ORDERS':
            return {preOrders: action.payload}
        case 'CREATE_ORDER':
            return {preOrders: [action.payload, ...state.preOrders]}
        case 'DELETE_ORDER':
            return {preOrders: state.preOrders.filter((b) => b._id !== action.payload._id)}
        case 'GET_ORDER':
            return {preOrders: state.preOrders.filter((b) => b._id !== action.payload._id)}
        default:
            return state
    }
}

export const PreOrdersProvider = ({children}) => {
    const [state, preOrdersdispatch] = useReducer(PreOrderReducer, {
        preOrders:[]
    })

    return (
        <PreOrdersContext.Provider value={{...state,preOrdersdispatch}}>
            {children}
        </PreOrdersContext.Provider>
    )
}
