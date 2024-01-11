import React, { useContext } from 'react'
import { useGetAllBidsQuery, useGetBidHistoryQuery } from '../RTKQuery/handleBids'
import { userContext } from '../utils/userContext'

const BidHistory = () => {
    const { user } = useContext(userContext)
    const { data } = useGetBidHistoryQuery(user!)
    const { data: allBids } = useGetAllBidsQuery()
    const handleSort = (type: string) => {
        if (data !== 'doesNotExist' && data !== undefined) {
            data.myBids.map(bid => {

            })
        }
    }

    function parseTime(timeString: string): number {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes; // Convert to minutes
    }

    const approveBid = () => {
        if (data !== 'doesNotExist' && data !== undefined) {

            const bestBid = data.myBids.reduce((bestSoFar, currentBid) => {
                // Only consider bids with approvalStatus true

                const currentStartTime = parseTime(currentBid.startTime);
                const currentEndTime = parseTime(currentBid.endTime);
                const bestStartTime = parseTime(bestSoFar?.startTime);
                const bestEndTime = parseTime(bestSoFar?.endTime);

                if (
                    (currentBid.cost < bestSoFar?.cost ||
                        (currentBid.cost === bestSoFar?.cost &&
                            (currentEndTime - currentStartTime) > (bestEndTime - bestStartTime)))
                ) {
                    return currentBid;
                } else {
                    return bestSoFar;
                }
            }, { quantity: 0, startTime: '00:00', endTime: '00:00', cost: Infinity, approvalStatus: false });
            return bestBid
        }
    }

    return (
        <div className='mt-16 w-6/12 mx-auto'>
            {data !== 'doesNotExist' && data !== undefined ?
                <table className='table-auto p-4 mx-auto bg-orange-400 border rounded-sm shadow-lg'>
                    <thead className=' font-bold py-2 rounded-sm md:text-base text-xs'>
                        <tr>
                            <th><button onClick={() => handleSort('cost')} className="py-2 pl-6 pr-4">Cost <span className='md:text-xs text-[8px]'> (EUR/MWh)</span></button></th>
                            <th><button onClick={() => handleSort('quantity')} className="py-2 px-4"> Quantity <span className='md:text-xs text-[8px]'>(MWh)</span></button></th>
                            <th><button onClick={() => handleSort('startTime')} className="py-2 px-4">Start Time</button></th>
                            <th><button onClick={() => handleSort('endTime')} className="py-2 pl-4 pr-6">End Time</button></th>
                            <th><button onClick={() => handleSort('endTime')} className="py-2 pl-4 pr-6">Approval Status</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.myBids.map((myBid, index) =>
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-orange-200' : 'bg-orange-100'} font-semibold py-3 rounded-sm md:text-base text-xs`}>
                                    < td className="pl-6 pr-4 py-2" > {myBid.cost}</td>
                                    <td className="px-4 py-2">{myBid.quantity}</td>
                                    <td className="px-4 py-2">{myBid.startTime.replace('T', ', ')}</td>
                                    <td className="pr-6 pl-4 py-2">{myBid.endTime.replace('T', ', ')}</td>
                                    <td className={`${myBid.approvalStatus === false ? 'text-red-500' : myBid.approvalStatus === true ? 'text-green-500' : 'text-orange-500'} pr-6 pl-4 py-2 font-bold`}>{myBid.approvalStatus === false ? 'Rejected' : myBid.approvalStatus === true ? 'Approved' : 'Pending'}</td>
                                </tr>)
                        }
                    </tbody>
                </table >
                : <div className="flex justify-center items-center mt-32 text-2xl text-slate-600 font-semibold">
                    Oops! You havent placed any bid yet.
                </div>
            }
        </div >
    )
}

export default BidHistory
