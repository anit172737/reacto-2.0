import { createSlice } from "@reduxjs/toolkit";

export const userMaster = createSlice({
  name: "userMaster",
  initialState: {
    userData: [],
    search: "",
    loginToast: false,
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("isAdmin", action.payload.userData?.isAdmin);
      localStorage.setItem("token", action.payload.token);
    },
    handleLogout: (state, action) => {
      localStorage.clear();
      // Revoke the Google authentication token
      // navigate("/");
      console.log("Logout Successfully");
    },
    showLoginToast: (state, action) => {
      state.loginToast = action.payload;
    },
  },
});

export const { handleLogin, handleLogout, showLoginToast } = userMaster.actions;
export default userMaster.reducer;
