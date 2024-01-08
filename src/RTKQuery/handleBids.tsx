import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { User } from "firebase/auth";

type PlaceBidInput = {
    quantity: string,
    startTime: string,
    endTime: string,
    cost: string,
    user: User
}

export const api = createApi({
    baseQuery: fakeBaseQuery(),
    reducerPath: 'api',
    endpoints: (build) => ({
        placeBid: build.query<string, PlaceBidInput>({
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
                    return { error: error }
                }
            }
        })
    })
})

export const { usePlaceBidQuery } = api