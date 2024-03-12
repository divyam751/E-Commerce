const { createSlice } = require("@reduxjs/toolkit");

const setSessionStore = (state) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("userData", JSON.stringify(state));
  }
};

const loadSessionStore = () => {
  if (typeof window !== "undefined") {
    const res = sessionStorage.getItem("userData");
    return res === null
      ? {
          userData: {
            userName: "",
            userId: "",
            token: "",
          },
        }
      : JSON.parse(res);
  }

  return {
    userData: {
      userName: "",
      userId: "",
      token: "",
    },
  };
};

const userSlice = createSlice({
  name: "users",
  initialState: loadSessionStore,
  reducers: {
    setUserDetails: (state, { payload }) => {
      console.log("payload :", payload);
      state.userData = { ...payload };
      setSessionStore(state);
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
