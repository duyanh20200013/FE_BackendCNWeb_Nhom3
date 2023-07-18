import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signUp } from '/src/api/authApi';
import Global from '/src/general/Global';
import PreferenceKeys from '/src/general/constants/PreferenceKeys';

export const thunkSignIn = createAsyncThunk('auth/login', async (params, thunkApi) => {
  const res = await login(params).then(res => {
    console.log(res.data);
    return res.data;
  });

  return res;
});

export const thunkUpdateCurrentUser = createAsyncThunk('user/edit', async (params, thunkApi) => {});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem(PreferenceKeys.accessToken),
    refreshToken: localStorage.getItem(PreferenceKeys.refreshToken),
    user: JSON.parse(localStorage.getItem(PreferenceKeys.user)) || {},
    isLogin: localStorage.getItem(PreferenceKeys.isLogin) || false,
  },
  reducers: {
    signOut: (state, action) => {
      console.log('sign out');
      localStorage.removeItem(PreferenceKeys.accessToken);
      localStorage.removeItem(PreferenceKeys.refreshToken);
      localStorage.removeItem(PreferenceKeys.isLogin);
      localStorage.removeItem(PreferenceKeys.user);
      Global.refreshToken = null;
      Global.accessToken = null;
      // state.user = null;
      // state.accessToken = null;
      // state.refreshToken = null;
      // state.isLogin = false;
    },
  },
  extraReducers: {
    // [thunkSignIn.pending]: (state, action) => {
    //   console.log({ action });
    //   console.log('Payload: ', action.payload);
    // },
    // [thunkSignIn.rejected]: (state, action) => {
    //   console.log({ action });
    //   state.refreshToken = action.payload?.userData?.refresh_token;
    //   console.log('Payload: ', action.payload);
    // },
    [thunkSignIn.fulfilled]: (state, action) => {
      console.log({ action });

      const userData = action?.payload?.userData;

      if (userData) {
        console.log('UserData', userData);
        state.user = userData.user;
        const { refresh_token: refreshToken, access_token: accessToken } = userData;
        Global.refreshToken = refreshToken;
        Global.accessToken = accessToken;
        localStorage.setItem(PreferenceKeys.accessToken, accessToken);
        localStorage.setItem(PreferenceKeys.refreshToken, refreshToken);
        localStorage.setItem(PreferenceKeys.isLogin, true);
        localStorage.setItem(PreferenceKeys.user, JSON.stringify(userData.user));
        console.log(1);
      }
    },
  },
});

export default authSlice;
