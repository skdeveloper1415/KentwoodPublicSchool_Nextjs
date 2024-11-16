import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getnotes } from '../services/user'


const initialState = {
    Culture_Yearloading: true,
    Culture_Year: [],

    Equitable_Yearloading: true,
    Equitable_Year: [],

    Whole_Child_Yearloading: true,
    Whole_Child_Year: [],

    High_Impact_Yearloading: true,
    High_Impact_Year: [],
}

export const fetchCulture_Year = createAsyncThunk(
    'fetchCulture_Year',
    async (Culture_Year, thunkAPI) => {
        Culture_Year = { ...Culture_Year, elasticQueryName: "Culture_Year" }
        const response = await getnotes(Culture_Year);
        return response.data
    }
)

export const fetchEquitable_Year = createAsyncThunk(
    'fetchEquitable_Year',
    async (Equitable_Year, thunkAPI) => {
        Equitable_Year = { ...Equitable_Year, elasticQueryName: "Equitable_Year" }
        const response = await getnotes(Equitable_Year);
        return response.data
    }
)

export const fetchWhole_Child_Year = createAsyncThunk(
    'fetchWhole_Child_Year',
    async (Whole_Child_Year, thunkAPI) => {
        Whole_Child_Year = { ...Whole_Child_Year, elasticQueryName: "Whole_Child_Year" }
        const response = await getnotes(Whole_Child_Year);
        return response.data
    }
)

export const fetchHigh_Impact_Year = createAsyncThunk(
    'fetchHigh_Impact_Year',
    async (High_Impact_Year, thunkAPI) => {
        High_Impact_Year = { ...High_Impact_Year, elasticQueryName: "High_Impact_Year" }
        const response = await getnotes(High_Impact_Year);
        return response.data
    }
)

export const Options = createSlice({
    name: 'Options',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(fetchCulture_Year.fulfilled, (state, action) => {
            state.Culture_Year = action.payload;
            state.Culture_Yearloading = false;
        }).addCase(fetchCulture_Year.pending, (state, action) => {
            state.Culture_Yearloading = true;
        })


        builder.addCase(fetchEquitable_Year.fulfilled, (state, action) => {
            state.Equitable_Year = action.payload;
            state.Equitable_Yearloading = false;
        }).addCase(fetchEquitable_Year.pending, (state, action) => {
            state.Equitable_Yearloading = true;
        })


        builder.addCase(fetchWhole_Child_Year.fulfilled, (state, action) => {
            state.Whole_Child_Year = action.payload;
            state.Whole_Child_Yearloading = false;
        }).addCase(fetchWhole_Child_Year.pending, (state, action) => {
            state.Whole_Child_Yearloading = true;
        })


        builder.addCase(fetchHigh_Impact_Year.fulfilled, (state, action) => {
            state.High_Impact_Year = action.payload;
            state.High_Impact_Yearloading = false;
        }).addCase(fetchHigh_Impact_Year.pending, (state, action) => {
            state.High_Impact_Yearloading = true;
        })
    }
})

export default Options.reducer