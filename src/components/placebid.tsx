import React, { useContext, useEffect, useState } from 'react'
import { usePlaceBidMutation } from '../RTKQuery/handleBids'
import useAuthListener from '../utils/useAuthListener'
import { userContext } from '../utils/userContext'

const Placebid = () => {
    const { user } = useContext(userContext)
    const [quantity, setQuantity] = useState<string>('')
    const [startTime, setStartTime] = useState<string>('')
    const [endTime, setEndTime] = useState<string>('')
    const [cost, setCost] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [placeBidMutation, { data, isLoading, isError, error: errorPlaceBid, isSuccess }] = usePlaceBidMutation()

    const handleSubmitBid = async () => {

        if (user) {

            if (quantity && startTime && endTime && cost) {
                await placeBidMutation({ quantity: parseInt(quantity), startTime, endTime, cost: parseFloat(cost), user })
            } else {
                setError('All fields are required to be filled')
            }
        }
    }

    const handleEndTimeValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hoursDiff = parseInt(e.target.value.substring(0, 2)) - parseInt(startTime.substring(0, 2))
        if (e.target.value === startTime || (hoursDiff <= 3 && hoursDiff > 0)) {
            setError('End Time must be at least 3 hours greater than startTime')
            setEndTime('')
        } else {
            setEndTime(e.target.value)
            setError('')
        }
        const minsDiff = (parseInt(e.target.value.substring(0, 2)) * 60) - (parseInt(startTime.substring(0, 2)) * 60)

    }

    return (
        <div className="mt-16 flex flex-col items-center justify-center">
            {
                data === 'successfully added bid details' ?
                    <div className="flex flex-col justify-center items-center p-12 shadow-xl">
                        <div className="font-semibold text-lg"> Your bid has been placed!! ✅</div>
                        <div className="">
                            Lets hope it gets approved! 🤞
                        </div>
                    </div>
                    : <>
                        <div className='font-semibold text-lg md:text-2xl mb-8 text-center '>Ready to place your bid?</div>
                        <div className='flex flex-col space-y-4 shadow-lg px-4 lg:px-20 py-8 md:w-1/2 w-2/3 justify-center items-start text-sm md:text-lg'>
                            <div className="flex space-x-2 items-center w-full pb-2">
                                <label className='font-semibold w-3/12'>
                                    Quantity <span className='text-xs md:text-sm'> (MWh) </span>:
                                </label>
                                <input type='text' value={quantity} onChange={(e) => setQuantity(e.target.value)}
                                    placeholder='Megawatt-hours (MWh)' className='after:content-[MWh] outline-none w-7/12 h-8 placeholder:text-xs md:placeholder:text-sm px-2  border border-b-orange-500 rounded-sm focus:border-b focus:border-b-orange-300'></input>
                            </div>
                            <div className="flex space-x-2 items-center w-full pb-2">
                                <label className='font-semibold w-3/12'>
                                    Start Time:
                                </label>
                                <input type='time' value={startTime} onChange={(e) => {
                                    setStartTime(e.target.value)
                                    setEndTime('')
                                }}
                                    className='w-7/12 px-2 py-1 border border-b-orange-500 rounded-sm focus:outline-none' />
                            </div>
                            <div className="flex space-x-2 items-center w-full pb-2">
                                <label className='font-semibold w-3/12'>
                                    Close Time:
                                </label>
                                <div className='block w-7/12'>
                                    <input type='time' value={endTime} onChange={(e) => { handleEndTimeValidation(e) }}
                                        className={`w-full px-2 py-1 border border-b-orange-500 rounded-sm ${error.includes('End Time') ? 'border-red-500 outline-none' : 'focus:outline-none'}`} />
                                    <p className={`${error.includes('End Time') ? 'block' : 'hidden'} text-xs text-red-600`}>
                                        {error}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-2 items-center w-full pb-6">
                                <label className='font-semibold w-3/12'>
                                    Cost per MWh <span className='text-xs md:text-sm'> (EUR)</span>:
                                </label>
                                <input type='text' value={cost} onChange={(e) => setCost(e.target.value)}
                                    placeholder='Euros(EUR/MWh)' className='outline-none w-7/12 h-8 placeholder:text-xs md:placeholder:text-sm px-2 border border-b-orange-500 rounded-sm focus:border-b focus:border-b-orange-300'></input>
                            </div >
                            {isError &&
                                <div className='text-sm text-red-600'>
                                    {errorPlaceBid as string}
                                </div>
                            }
                            {
                                error.includes('All fields') &&
                                <p className='text-red-600 text-sm text-center mx-auto'>{error}</p>
                            }
                            <button onClick={() => handleSubmitBid()}
                                className='flex justify-center items-center w-1/3 mx-auto px-2 py-2 rounded-sm text-white text-sm md:text-lg font-semibold bg-orange-700 hover:bg-orange-500 hover:text-white hover:border-none'>
                                Submit
                            </button>
                        </div >
                    </>
            }
        </div>
    )
}

export default Placebid
