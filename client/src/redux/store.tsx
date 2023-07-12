import {
  configureStore,
  combineReducers,
  AnyAction,
  ThunkAction,
} from '@reduxjs/toolkit';

import authSlice from './authSlice';

const rootReducer = combineReducers({ authSlice });

export const store = configureStore({
  reducer: rootReducer,
});
