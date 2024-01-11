import { createApi } from "@reduxjs/toolkit/query/react";
import { fakeBaseQuery } from "@reduxjs/toolkit/query"
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { User } from "firebase/auth";

type PlaceBidArg = {
    quantity: number,
    startTime: string,
    endTime: string,
    cost: number,
    user: User | null
}

type BidObj = {
    myBids: {
        quantity: number,
        startTime: string,
        endTime: string,
        cost: number,
        approvalStatus: boolean
    }[]
}

export const api = createApi({
    baseQuery: fakeBaseQuery(),
    reducerPath: 'api',
    tagTypes: ['PlaceBid'],
    endpoints: (build) => ({
        placeBid: build.mutation<string, PlaceBidArg>({
            async queryFn({ quantity, startTime, endTime, cost, user }) {
                try {
                    if (user) {
                        const bidDocRef = doc(db, `AllBids/${user.uid}`)
                        const response = await getDoc(bidDocRef)
                        if (response.exists()) {
                            const result = await updateDoc(bidDocRef, {
                                myBids: arrayUnion({
                                    quantity,
                                    startTime,
                                    endTime,
                                    cost
                                })
                            })
                        } else {
                            await setDoc(bidDocRef, {
                                myBids: [{
                                    quantity,
                                    startTime,
                                    endTime,
                                    cost
                                }]
                            })
                        }
                    }
                    return { data: 'successfully added bid details' }
                }
                catch (error) {
                    return { error: 'Failed to add bid details' }
                }
            },
            invalidatesTags: ['PlaceBid']
        }),

        getBidHistory: build.query<BidObj | 'doesNotExist', User>({
            async queryFn(user) {
                try {
                    const bidDocRef = doc(db, `AllBids/${user.uid}`)
                    const result = await getDoc(bidDocRef)
                    if (result.exists()) {
                        const resData = result.data()
                        if (resData !== undefined) {
                            const res: BidObj = result.data() as BidObj
                            return { data: res }
                        } else {
                            return { data: 'doesNotExist' }
                        }
                    } else {
                        return { data: 'doesNotExist' }
                    }
                }
                catch (error) {
                    return { error: error }
                }
            },
            providesTags: ['PlaceBid']
        }),
        getAllBids: build.query<BidObj | 'doesNotExist', void>({
            async queryFn() {
                try {
                    const bidDocRef = doc(db, `AllBids`)
                    const result = await getDoc(bidDocRef)
                    if (result.exists()) {
                        const resData = result.data()
                        if (resData !== undefined) {
                            const res: BidObj = result.data() as BidObj
                            return { data: res }
                        } else {
                            return { data: 'doesNotExist' }
                        }
                    } else {
                        return { data: 'doesNotExist' }
                    }
                }
                catch (error) {
                    return { error: error }
                }
            },
            providesTags: ['PlaceBid']
        })
    })
})

export const { usePlaceBidMutation, useGetBidHistoryQuery, useGetAllBidsQuery } = api