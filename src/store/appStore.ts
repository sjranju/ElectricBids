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

export type RootState = ReturnType<typeof appStore.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export type DispatchType = typeof appStore.dispatch
export const useAppDispatch: () => DispatchType = useDispatch