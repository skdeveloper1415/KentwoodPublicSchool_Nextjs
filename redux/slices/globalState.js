import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    ReduxTest: "Kent Wood Public School",
    trigger: false,

    ActiveTabTile:0,
    userData: {},


}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setState: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const { setState } = globalSlice.actions;
export default globalSlice.reducer;

