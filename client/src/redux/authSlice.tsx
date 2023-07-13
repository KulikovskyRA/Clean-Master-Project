import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: { id: 0, name: '', email: '', phoneNumber: '' },
  admin: { id: 0, name: '', email: '', phoneNumber: '' },
  cleaner: { id: 0, name: '', phoneNumber: '' },
  // type: '',
  // id: 0,
  // name: '',
  // email: '',
  // phoneNumber: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    checkAuthReducer(state, action) {
      console.log(action.payload);
      if (action.payload.user) {
        state.user.name = action.payload.user.name || '';
        state.user.id = action.payload.user.id || '';
        state.user.email = action.payload.user.email || '';
        state.user.phoneNumber = action.payload.user.phoneNumber || '';
      }
      if (action.payload.admin) {
        state.admin.name = action.payload.admin.name || '';
        state.admin.id = action.payload.admin.id || '';
        state.admin.email = action.payload.admin.email || '';
        state.admin.phoneNumber = action.payload.admin.phoneNumber || '';
      }

      if (action.payload.cleaner) {
        state.cleaner.name = action.payload.admin.name || '';
        state.cleaner.id = action.payload.admin.id || '';
        state.cleaner.email = action.payload.admin.email || '';
        state.cleaner.phoneNumber = action.payload.admin.phoneNumber || '';
      }
    },

    authReducer(state, action) {
      if (action.payload.type === 'user') {
        state.user.name = action.payload.name || '';
        state.user.id = action.payload.id || '';
        state.user.email = action.payload.email || '';
        state.user.phoneNumber = action.payload.phoneNumber || '';
      } else if (action.payload.type === 'admin') {
        state.admin.name = action.payload.name || '';
        state.admin.id = action.payload.id || '';
        state.admin.email = action.payload.email || '';
        state.admin.phoneNumber = action.payload.phoneNumber || '';
      } else if (action.payload.type === 'cleaner') {
        state.cleaner.name = action.payload.name || '';
        state.cleaner.id = action.payload.id || '';
        state.cleaner.email = action.payload.email || '';
        state.cleaner.phoneNumber = action.payload.phoneNumber || '';
      }
    },
  },
});

export default authSlice.reducer;

export const { authReducer, checkAuthReducer } = authSlice.actions;
