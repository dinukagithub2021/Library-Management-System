import { useState } from "react";
import {useAuthContext} from "./useAuthContext"

export const useLibrarianLogin = () => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState()
    const {dispatch} = useAuthContext()
    const librarianLogIn = async (username,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/librarian/login", {
            method: 'POST',
            headers: {'Content-Type': 'Application/json' },
            body: JSON.stringify({username,password})
        })

        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem("user", JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }


    return {librarianLogIn, error, isLoading}
}