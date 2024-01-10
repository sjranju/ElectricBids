import { onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { auth } from './firebase'
import { userContext } from './userContext'
import { useNavigate } from 'react-router-dom'

const useAuthListener = () => {
    const { user, setUser } = useContext(userContext)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ?
                setUser(user)
                : navigate('/')
        })

        return () => unsubscribe()
    }, [auth, navigate])

    return (user)
}

export default useAuthListener
