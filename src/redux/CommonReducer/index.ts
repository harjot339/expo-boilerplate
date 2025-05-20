import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userToken: undefined,
  userData: undefined,
};

const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.userData = action.payload;
      state.userToken = action.payload.token;
    },
    logoutUser(state) {
      state.userData = undefined;
      state.userToken = undefined;
    },
  },
});

export const { loginUser, logoutUser } = common.actions;

export default common.reducer;
