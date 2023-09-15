import {createContext, useReducer} from "react"

export const PreOrdersContext = createContext()

export const PreOrderReducer = (state,action)=> {
    switch (action.type){
        case 'SET_ORDERS':
            console.log([...action.payload])
            return {preOrders: [...action.payload]}
        case 'CREATE_ORDER':
            console.log('Creating order', action.payload);
            console.log('state.preOrdres', state.preOrders)
            const updatedPreOrders = [{...action.payload}, ...state.preOrders];
           
            console.log('Updated preOrders', updatedPreOrders);
            return { preOrders: updatedPreOrders };
        case 'DELETE_ORDER':
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
