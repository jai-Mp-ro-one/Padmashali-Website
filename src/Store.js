import { configureStore } from '@reduxjs/toolkit'
// import { reducerFunction } from './Redux/Reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducerFunction } from './Redux/Reducer'


const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducerFunction);

export const store = configureStore({
    reducer: persistedReducer,
})

// export default store;
export const persistor = persistStore(store)