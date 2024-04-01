const { createSlice } = require("@reduxjs/toolkit");

export const setSessionStore = (state) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("userData", JSON.stringify(state));
  }
};

const userSlice = createSlice({
  name: "users",
  initialState: { userData: { userName: "", userId: "", token: "" } },
  reducers: {
    setUserDetails: (state, { payload }) => {
      // console.log("payload :", payload);
      state.userData = { ...payload };
      setSessionStore(state);
    },
    logout: (state) => {
      state.userData = {
        ...state.userData,
        userName: "",
        userId: "",
        token: "",
      };
      setSessionStore(state);
    },
  },
});

export const { setUserDetails, logout } = userSlice.actions;

export default userSlice.reducer;
