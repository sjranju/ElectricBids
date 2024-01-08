import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { db } from '../utils/firebase'
import { userContext } from '../utils/userContext'

const Placebid = () => {
    const [quantity, setQuantity] = useState<number | null>(null)
    const [startTime, setStartTime] = useState<string>('')
    const [endTime, setEndTime] = useState<string>('')
    const [cost, setCost] = useState<number | null>(null)
    const { user } = useContext(userContext)
    const [error, setError] = useState<string>('')

    const addBidDetails = async () => {

        if (user) {
            console.log(quantity, startTime, endTime, cost)
            const bidDocRef = doc(db, `AllBids/${user.uid}`)
            await getDoc(bidDocRef)
                .then(async (response) => {
                    if (response.exists()) {
                        await updateDoc(bidDocRef, {
                            myBids: arrayUnion({
                                quantity,
                                startTime,
                                endTime,
                                cost
                            })
                        })
                            .then(response => console.log('successfully updated bid details', response))
                            .catch(error => setError(error.message))
                    } else {
                        await setDoc(bidDocRef, {
                            myBids: [{
                                quantity,
                                startTime,
                                endTime,
                                cost
                            }]
                        })
                            .then(response => console.log('Successfully added bid details', response))
                            .catch(error => setError(error.message))
                    }
                })
        }
    }

    return (
        <div className="mt-16 flex flex-col items-center justify-center">
            <div className='font-semibold text-2xl mb-8 text-center '>Ready to place your bid?</div>
            <div className='flex flex-col space-y-4 shadow-lg px-32 py-8 w-1/2 justify-center items-start'>
                <div className="flex space-x-2 items-center w-full">
                    <label className='font-semibold w-3/12'>
                        Quantity:
                    </label>
                    <input type='number' value={quantity ?? ''} onChange={(e) => setQuantity(Number.isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber)}
                        placeholder='Megawatt-hours (MWh)' className='outline-none w-7/12 h-8 placeholder:text-sm px-2  border border-b-orange-500 rounded-sm focus:border-b focus:border-b-orange-300'></input>
                </div>
                <div className="flex space-x-2 items-center w-full">
                    <label className='font-semibold w-3/12'>
                        Start Time:
                    </label>
                    <input type='datetime-local' value={startTime} onChange={(e) => setStartTime(e.target.value)}
                        className='w-7/12 px-2 py-1 border border-b-orange-500 rounded-sm focus:outline-orange-400' />
                </div>
                <div className="flex space-x-2 items-center w-full">
                    <label className='font-semibold w-3/12'>
                        Close Time:
                    </label>
                    <input type='datetime-local' value={endTime} onChange={(e) => setEndTime(e.target.value)}
                        className='w-7/12 px-2 py-1 border border-b-orange-500 rounded-sm focus:outline-orange-400 ' />
                </div>
                <div className="flex space-x-2 items-center w-full pb-4">
                    <label className='font-semibold w-3/12'>
                        Cost per MWh:
                    </label>
                    <input type='number' value={cost ?? ''} onChange={(e) => setCost(Number.isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber)}
                        placeholder='Euros(EUR/MWh)' className='outline-none w-7/12 h-8 placeholder:text-sm px-2 border border-b-orange-500 rounded-sm focus:border-b focus:border-b-orange-300'></input>
                </div >
                {error &&
                    <div className='text-sm text-red-600'>
                        {error}
                    </div>}
                <button onClick={addBidDetails}
                    className='flex justify-center items-center w-1/3 mx-auto px-2 py-2 rounded-sm text-white text-lg font-semibold bg-orange-700 hover:bg-orange-500 hover:text-white hover:border-none'>
                    Submit
                </button>
            </div >
        </div>
    )
}

export default Placebid
