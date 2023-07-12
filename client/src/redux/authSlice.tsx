import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  id: 0,
  name: '',
  email: '',
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
    },
  },
});

export default authSlice.reducer;

export const { authReducer } = authSlice.actions;
