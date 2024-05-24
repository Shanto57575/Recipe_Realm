import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './Features/userSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store);
export default store
