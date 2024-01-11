import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../utils/userContext'
import { AiOutlineUser } from 'react-icons/ai'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import useAuthListener from '../utils/useAuthListener'
import ElectricBids1 from '../images/ElectricBids1.png'

const Header = () => {
    const user = useAuthListener()
    const { setUser } = useContext(userContext)
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    console.log('user in header', user)

    useEffect(() => {

        const handleMouseClickOutsideDropdown = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleMouseClickOutsideDropdown)

        return () => document.removeEventListener('mousedown', handleMouseClickOutsideDropdown)
    }, [])

    return (
        <div className='shadow-lg py-4 text-zinc-950 font-semibold text-sm md:text-md px-32'>
            <div className=' flex flex-row items-center justify-between'>
                <div className="">
                    <Link to='/'><img src={ElectricBids1} className='w-14 rounded-sm'></img></Link>
                </div>
                <div className='flex flex-row items-center justify-center space-x-8'>
                    {user ?
                        <>
                            <div className='hover:text-orange-600'><Link to={'/placebid'}>Place Bid</Link></div>
                            <div className='hover:text-orange-600'><Link to='bidhistory'>Bidding history</Link></div>
                            <div className="relative">
                                <button className='flex items-center text-orange-600' onClick={() => setShowDropdown(!showDropdown)}><AiOutlineUser size={22} />{user.displayName}</button>
                                <div ref={dropdownRef} className={`${showDropdown ? 'absolute' : 'hidden'} top-7 z-10 flex flex-col items-start space-y-2 text-sm rounded-sm py-3 pr-14 pl-6 bg-white shadow-lg`}>
                                    <button className="text-orange-600 hover:text-black">Profile</button>
                                    <button className="text-orange-600 hover:text-black">Settings</button>
                                    <button className="text-orange-600 hover:text-black"
                                        onClick={() => {
                                            signOut(auth)
                                            setUser(null)
                                        }}>
                                        Logout
                                    </button>
                                </div>
                            </div>

                        </>
                        : <Link to='/login' className='hover:text-orange-600'>Login</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
