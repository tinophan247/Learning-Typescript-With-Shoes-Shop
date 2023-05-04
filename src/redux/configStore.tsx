import {configureStore} from '@reduxjs/toolkit';
import productReducer from './ProductReducer/productReducer'
import userReducer from './UserReducer/userReducer';


export const store = configureStore({
    reducer:{
        productReducer,
        userReducer

    }
});


export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch