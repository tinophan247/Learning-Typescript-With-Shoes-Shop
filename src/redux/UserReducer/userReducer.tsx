import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserLoginModel } from '../../pages/Login/Login';
import { ACCESS_TOKEN, history, http, settings, USER_LOGIN } from '../../util/config';

/* userProfile*/
export interface UserProfile {
    ordersHistory: OrdersHistory[];
    email:         string;
    name:          string;
    password:      null;
    gender:        boolean;
    phone:         string;
    facebookId:    string;
    deleted:       boolean;
    avatar:        string;
}
export interface OrdersHistory {
    orderDetail: OrderDetail[];
    id:          number;
    date:        Date;
    status:      null;
    email:       string;
    alias:       string;
}
export interface OrderDetail {
    name:             string;
    alias:            string;
    shortDescription: string;
    quantity:         number;
    price:            number;
    image:            string;
    description:      string;
}


/* userLogin */
export interface UserLoginResult {
    email: string,
    accessToken: string
}


export interface UserState {
    userLogin: UserLoginResult,
    userProfile:UserProfile | null
}



const initialState: UserState = {
    userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN) : null,
    userProfile: null


}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loginAsyncApi.fulfilled, (state: UserState, action: PayloadAction<UserLoginResult>) => {
            state.userLogin = action.payload;
            settings.setStorageJson(USER_LOGIN,action.payload);
            settings.setCookieJson(USER_LOGIN,action.payload,30);
            settings.setStorage(ACCESS_TOKEN,action.payload.accessToken);
            settings.setCookie(ACCESS_TOKEN,action.payload.accessToken,30);
            history.push('/profile');
        });

        //Xử lý profile
        builder.addCase(getProfileAsyncApi.fulfilled,(state:UserState,action:PayloadAction<UserProfile>) => {
            state.userProfile = action.payload
        });

        builder.addCase(loginFacebookApi.fulfilled,(state:UserState,action:PayloadAction<UserLoginResult>) => {
            state.userLogin = action.payload
            settings.setStorageJson(USER_LOGIN,action.payload);
            settings.setCookieJson(USER_LOGIN,action.payload,30);
            settings.setStorage(ACCESS_TOKEN,action.payload.accessToken);
            settings.setCookie(ACCESS_TOKEN,action.payload.accessToken,30);
            history.push('/profile');
        })
    }


});

export const { } = userReducer.actions
export default userReducer.reducer
export const loginAsyncApi = createAsyncThunk(
    'userReducer/loginAsyncApi',
    async (userLogin: UserLoginModel):Promise<UserLoginResult> => {
        const response = await http.post(`/api/Users/signin`, userLogin);
        return response.data.content;
    }
);
export const getProfileAsyncApi = createAsyncThunk(
    'userReducer/getProfileAsyncApi',
    async ():Promise<UserProfile> => {
        const response = await http.post('/api/users/getProfile');
        return response.data.content;
    }
);

export type FacebookDataLogin = {
    facebookToken:string
}


export const loginFacebookApi = createAsyncThunk(
    'userReducer/loginFacebookApi',
    async (facebookToken:string):Promise<UserLoginResult> => {
        let data:FacebookDataLogin =  {
            facebookToken:facebookToken
        }
        const response = await http.post('/api/Users/facebooklogin',data);
        return response.data.content;
    }
);