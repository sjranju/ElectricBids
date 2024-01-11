import { useContext, useEffect, useState } from "react"
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, updateProfile } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc'
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { userContext } from "../utils/userContext";
import energy3 from "../images/energy3.jpg"

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    'login_hint': 'user@gmail.com'
});

const Login = () => {
    const [emailAddress, setEmailAddress] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [wannaSignUp, setWannaSignUp] = useState<boolean>(false)
    const [providerName, setProviderName] = useState<string>('')
    const navigate = useNavigate()
    const { setUser } = useContext(userContext)

    const loginWithEmailAndPassword = async () => {
        await signInWithEmailAndPassword(auth, emailAddress, password)
            .then(userCredentials => {
                setUser(userCredentials.user)
                navigate('/')
            })
            .catch(error => {
                console.log(error)
                setError(error.message.replace('Firebase:', ''))
            })
    }

    const signUpWithEmailAndPassword = async () => {
        await createUserWithEmailAndPassword(auth, emailAddress, password)
            .then(async (user) => {
                await updateProfile(user.user, { displayName: providerName })
                    .then(up => {
                        setUser(user.user)
                        navigate('/')
                    })
                    .catch(error => setError(error.message.replace('Firebase:', '')))
            })
            .catch(error => setError(error.message.replace('Firebase:', '')))
    }

    const gmailLoginWithEmailAndPassword = async () => {
        await signInWithPopup(auth, provider)
            .then(async (user) => {
                setUser(user.user)
                navigate('/')
            })
            .catch(error => {
                console.log('error in gmail login', error.message)
                setError(error.message)
            })
    }

    return (
        <div className="flex mx-auto w-7/12 h-[500px] shadow-xl md:space-x-8 mt-16 rounded-sm md:pr-8 p-6">
            <div className=" hidden md:block w-7/12">
                <img src={energy3} className=" w-full h-full object-fill rounded-sm opacity-90" alt="energy"></img>
            </div>
            <div className="flex flex-col md:w-5/12 w-full">
                <div className="flex flex-col mt-4 space-y-6 ">
                    <div className="text-center font-bold text-lg text-blue-700 mb-2">LOGIN</div>
                    <input type="text" name="emailAddress" placeholder="Enter your Email ID" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}
                        className="border border-b-blue-500 px-2 h-8 focus:outline-none placeholder:text-sm" />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="border border-b-blue-500 px-2 h-8 focus:outline-none placeholder:text-sm" />
                    <input type="text" name="providerName" placeholder="Provider Name" value={providerName} onChange={(e) => setProviderName(e.target.value)}
                        className={`${wannaSignUp ? 'block' : 'hidden'} border border-b-blue-500 px-2 h-8 focus:outline-none placeholder:text-sm`} />
                    <button onClick={wannaSignUp ? signUpWithEmailAndPassword : loginWithEmailAndPassword}
                        className="bg-blue-700 text-white font-semibold text-md px-1 py-1.5 rounded-sm hover:bg-blue-500">
                        {wannaSignUp ? 'SignUp' : 'Login'}
                    </button>
                </div>
                {
                    wannaSignUp ?
                        <div className="text-center text-sm mt-2">Already have an account?
                            <button className="text-blue-600 font-semibold hover:text-blue-400 ml-2" onClick={() => setWannaSignUp(!wannaSignUp)}> Login </button>
                        </div>
                        : <div className="text-center text-sm mt-2">Don't have an account?
                            <button className="text-blue-600 font-semibold hover:text-blue-400 ml-2" onClick={() => setWannaSignUp(!wannaSignUp)}> SignUp </button>
                        </div>
                }


                <div className="flex flex-col mt-4 space-y-2">
                    <div className="text-center text-xs text-gray-600 mb-2">OR</div>
                    <button className="flex justify-center items-center border border-blue-500" onClick={gmailLoginWithEmailAndPassword}>
                        <FcGoogle size={24} className="p-0.5" />
                        <span className="bg-blue-500 text-white text-xs px-1 py-1.5 w-full font-semibold">
                            Sign In with Google</span>
                    </button>
                    <button className="flex justify-center items-center bg-gray-200 text-slate-500 text-xs px-1 py-1.5 w-full font-semibold"> Sign In with SSO</button>
                </div>
                <div className="text-red-600 text-sm mt-2 font-medium">{error && error}</div>
            </div>
        </div>
    )
}

export default Login