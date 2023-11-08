import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "../../services/auth/auth.service";
import {IAuthResponse, ILogin, IRegister} from "./user.interface";
import {errorCatch} from "../../api/api.helper";

export const registerTC = createAsyncThunk<IAuthResponse, IRegister>('auth/register', async (data, thunkAPI) => {
    try {
      const res = await AuthService.register(data)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const loginTC = createAsyncThunk<IAuthResponse, ILogin>('auth/login', async (data, thunkAPI) => {
    try {
      const res = await AuthService.login(data)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const logoutTC = createAsyncThunk('auth/logout', async (_) => {
    await AuthService.logout()
  }
)

export const checkAuthTC = createAsyncThunk<IAuthResponse>('auth/check-auth', async (_, thunkAPI) => {
    try {
      const res = await AuthService.getNewTokens()
      return res.data
    } catch (error) {
      if (errorCatch(error) === 'jwt expired') {
        thunkAPI.dispatch(logoutTC())
        throw new Error('Your authorization is finished, please sign in again')
      }

      return thunkAPI.rejectWithValue(error)
    }
  }
)