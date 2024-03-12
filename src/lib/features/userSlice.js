const { createSlice } = require("@reduxjs/toolkit");

const setSessionStore = (state) => {
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
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
