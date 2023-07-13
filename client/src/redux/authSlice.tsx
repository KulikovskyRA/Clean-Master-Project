import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TypeState = {
  type: string,
  id: number,
  name: string,
  email: string,
  phone: string

}

const initialState: TypeState = {
  type: '',
  id: 0,
  name: '',
  email: '',
  phone: ''
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    authReducer(state, action) {
      state.type = action.payload.type;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
  },
});

export default authSlice.reducer;

export const { authReducer } = authSlice.actions;
