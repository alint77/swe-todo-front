import { createContext, useState, useEffect } from "react";

import cookie from 'js-cookie'
import { useRouter } from "next/router";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()

    useEffect(() =>
        checkUserLoggedIn()
        , [])

    //Register
    const register = async (userInput) => {

        const res = await fetch('http://localhost:4000/api/auth/signup',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: userInput.fName,
                    lastname: userInput.lName,
                    email: userInput.email,
                    password: userInput.password,
                    password_confirm: userInput.password
                })
            })

        const data = await res.json()
        console.log(data);

        if (res.ok) {
            alert('success');
            setUser(data)
            router.push("/profile")
        } else {
            setError(data.message)
            setError(null)
        }

    }
    //Login
    const login = async ({ email, password }) => {

        const res = await fetch('http://localhost:4000/api/auth/signin',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

        const data = await res.json()

        console.log(data);

        if (res.ok) {
            setUser(data)
            router.push("/profile")

        } else {
            setError(data.message)
            setError(null)
        }

    }
    //Logout
    const logout = async () => {
        const res = await fetch('http://localhost:4000/api/auth/signout', {
            method: 'POST',
            credentials: 'include'
        })

        if (res.ok) {
            setUser(null)
            router.push('/login')
        } else {
            setError(data.message)
            setError(null)
        }


    }
    //Check

    const checkUserLoggedIn = async () => {
        const res = await fetch('http://localhost:4000/api/auth/whoami', {
            method: 'GET',
            credentials: 'include'
        })

        const data = await res.json()
        if (res.ok) {
            setUser(data)
        } else {
        }
    }

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout, checkUserLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext
