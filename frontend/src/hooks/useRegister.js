import { useState } from "react";
import {useAuthContext} from "./useAuthContext"

export const useRegister = () => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState()
    const {dispatch} = useAuthContext()
    const signUp = async (name,age,telephone,birthday,admissionNo,address,email,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/user/signup", {
            method: 'POST',
            headers: {'Content-Type': 'Application/json' },
            body: JSON.stringify({name,age,telephone,birthday,admissionNo,address,email,password})
        })

        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem("user", JSON.stringify(json))
            console.log(JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }


    return {signUp, error, isLoading}
}