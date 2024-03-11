const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "users",
  initialState: {
    userData: [],
    userId: [],
    userName: [],
    token: [],
  },
  reducers: [],
});
