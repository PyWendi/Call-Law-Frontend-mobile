import { configureStore } from "@reduxjs/toolkit";
import { 
    persistStore, persistReducer } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage";
import AllReducers from "./reducers"

const persistConfiguration = {
    key: "root",
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfiguration, AllReducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: true, 
            }
    })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)