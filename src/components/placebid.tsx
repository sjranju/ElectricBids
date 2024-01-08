import React, { useState } from 'react'

const Placebid = () => {
    const [name, setName] = useState<string>('')
    const [quantity, setQuantity] = useState<number | undefined>(undefined)
    const [startTime, setStartTime] = useState<string>('')
    const [endTime, setEndTime] = useState<string>('')
    const [cost, setCost] = useState<number | undefined>(undefined)

    return (
        <div className="mt-16 mx-auto w-6/12">
            <div className='flex flex-col space-y-4 py-10 px-12 shadow-lg'>
                <div className='font-semibold text-2xl mb-12 text-center '>Ready to place your bid?</div>
                <div className="flex space-x-2 items-center">
                    <label className='font-semibold w-2/12'>
                        Quantity:
                    </label>
                    <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.valueAsNumber)}
                        placeholder='Megawatt-hours (MWh)' className='outline-none w-4/12 h-8 placeholder:text-sm px-2  border border-b-orange-500 rounded-sm focus:border-b focus:border-b-orange-300'></input>
                </div>
                <div className="flex space-x-2 items-center">
                    <label className='font-semibold w-2/12'>
                        Start Time:
                    </label>
                    <input type='datetime-local' value={startTime} onChange={(e) => setStartTime(e.target.value)}
                        className='w-4/12 px-2 py-1 border border-b-orange-500 rounded-sm focus:outline-orange-400' />
                </div>
                <div className="flex space-x-2 items-center">
                    <label className='font-semibold w-2/12'>
                        Close Time:
                    </label>
                    <input type='datetime-local' value={endTime} onChange={(e) => setEndTime(e.target.value)}
                        className='w-4/12 px-2 py-1 border border-b-orange-500 rounded-sm focus:outline-orange-400 ' />
                </div>
                <div className="flex space-x-2 items-center">
                    <label className='font-semibold w-2/12'>
                        Cost per MWh:
                    </label>
                    <input type='number' value={cost} onChange={(e) => setCost(e.target.valueAsNumber)}
                        placeholder='Euros(EUR/MWh)' className='outline-none w-4/12 h-8 placeholder:text-sm px-2 border border-b-orange-500 rounded-sm focus:border-b focus:border-b-orange-300'></input>
                </div >
                <button className='flex justify-center items-center w-1/3 mx-auto px-2 py-2 rounded-sm text-white text-lg font-semibold bg-orange-700 hover:bg-orange-500 hover:text-white hover:border-none mt-4'>Submit</button>
            </div >
        </div>
    )
}

export default Placebid
