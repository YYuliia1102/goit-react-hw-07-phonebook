import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import contactReducer from "./contactSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["contacts"], // Зберігати тільки ключ `contacts` у локальному сховищі
};

const persistedReducer = persistReducer(persistConfig, contactReducer);

const store = configureStore({
    reducer: {
        contacts: persistedReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export default store;
