import { useState } from "react";
import {useAuthContext} from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState()
    const {dispatch} = useAuthContext()
    const logIn = async (email,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/user/login", {
            method: 'POST',
            headers: {'Content-Type': 'Application/json' },
            body: JSON.stringify({email,password})
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


    return {logIn, error, isLoading}
}