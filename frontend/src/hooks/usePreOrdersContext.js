import { PreOrdersContext } from "../context/preOrderContext";
import { useContext } from "react";

export const usePreOrdersContext = () => {
    const context = useContext(PreOrdersContext)
    if(!context){
        throw Error("Hi, this is an error")
    }
    return context
}