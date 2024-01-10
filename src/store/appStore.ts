import { configureStore } from "@reduxjs/toolkit";
import { api } from "../RTKQuery/handleBids";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const appStore = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (gDM) =>
        gDM({ serializableCheck: false }).concat(api.middleware)
})

export const store = appStore

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector