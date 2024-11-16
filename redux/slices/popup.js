import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getnotes } from '../services/user'


const initialState = {
    Culture_Initiative_popup_dimension_1loading: true,
    Culture_Initiative_popup_dimension_1: [],

    Culture_Initiative_popup_dimension_2loading: true,
    Culture_Initiative_popup_dimension_2: [],

    Culture_Initiative_popup_dimension_3loading: true,
    Culture_Initiative_popup_dimension_3: [],

    Culture_Initiative_popup_dimension_4loading: true,
    Culture_Initiative_popup_dimension_4: [],

    Equitable_Initiative_popup_dimension_1loading: true,
    Equitable_Initiative_popup_dimension_1: [],

    Equitable_Initiative_popup_dimension_2loading: true,
    Equitable_Initiative_popup_dimension_2: [],

    WholeChild_Initiative_popup_dimension_1loading: true,
    WholeChild_Initiative_popup_dimension_1: [],

    WholeChild_Initiative_popup_dimension_2loading: true,
    WholeChild_Initiative_popup_dimension_2: [],

    HighImpact_Initiative_popup_dimension_1loading: true,
    HighImpact_Initiative_popup_dimension_1: [],

    HighImpact_Initiative_popup_dimension_2loaing: true,
    HighImpact_Initiative_popup_dimension_2: [],

    HighImpact_Initiative_popup_dimension_3loading: true,
    HighImpact_Initiative_popup_dimension_3: [],

    High_Impact_Plan_of_Actionloading: true,
    High_Impact_Plan_of_Action: [],

    Whole_Child_Environment_Plan_of_Actionsloading: true,
    Whole_Child_Environment_Plan_of_Actions: [],

    Equitable_Opportunity_Plan_of_Actionloading: true,
    Equitable_Opportunity_Plan_of_Action: [],

    Culture_Excellence_Plan_of_Actionloading: true,
    Culture_Excellence_Plan_of_Action: [],
}

export const fetchCulture_Initiative_popup_dimension_1 = createAsyncThunk(
    'fetchCulture_Initiative_popup_dimension_1',
    async (Culture_Initiative_popup_dimension_1, thunkAPI) => {
        Culture_Initiative_popup_dimension_1 = { ...Culture_Initiative_popup_dimension_1, elasticQueryName: "Culture_Initiative_popup_dimension_1" }
        const response = await getnotes(Culture_Initiative_popup_dimension_1);
        return response.data
    }
)

export const fetchCulture_Initiative_popup_dimension_2 = createAsyncThunk(
    'fetchCulture_Initiative_popup_dimension_2',
    async (Culture_Initiative_popup_dimension_2, thunkAPI) => {
        Culture_Initiative_popup_dimension_2 = { ...Culture_Initiative_popup_dimension_2, elasticQueryName: "Culture_Initiative_popup_dimension_2" }
        const response = await getnotes(Culture_Initiative_popup_dimension_2);
        return response.data
    }
)

export const fetchCulture_Initiative_popup_dimension_3 = createAsyncThunk(
    'fetchCulture_Initiative_popup_dimension_3',
    async (Culture_Initiative_popup_dimension_3, thunkAPI) => {
        Culture_Initiative_popup_dimension_3 = { ...Culture_Initiative_popup_dimension_3, elasticQueryName: "Culture_Initiative_popup_dimension_3" }
        const response = await getnotes(Culture_Initiative_popup_dimension_3);
        return response.data
    }
)

export const fetchCulture_Initiative_popup_dimension_4 = createAsyncThunk(
    'fetchCulture_Initiative_popup_dimension_4',
    async (Culture_Initiative_popup_dimension_4, thunkAPI) => {
        Culture_Initiative_popup_dimension_4 = { ...Culture_Initiative_popup_dimension_4, elasticQueryName: "Culture_Initiative_popup_dimension_4" }
        const response = await getnotes(Culture_Initiative_popup_dimension_4);
        return response.data
    }
)

export const fetchEquitable_Initiative_popup_dimension_1 = createAsyncThunk(
    'fetchEquitable_Initiative_popup_dimension_1',
    async (Equitable_Initiative_popup_dimension_1, thunkAPI) => {
        Equitable_Initiative_popup_dimension_1 = { ...Equitable_Initiative_popup_dimension_1, elasticQueryName: "Equitable_Initiative_popup_dimension_1" }
        const response = await getnotes(Equitable_Initiative_popup_dimension_1);
        return response.data
    }
)

export const fetchEquitable_Initiative_popup_dimension_2 = createAsyncThunk(
    'fetchEquitable_Initiative_popup_dimension_2',
    async (Equitable_Initiative_popup_dimension_2, thunkAPI) => {
        Equitable_Initiative_popup_dimension_2 = { ...Equitable_Initiative_popup_dimension_2, elasticQueryName: "Equitable_Initiative_popup_dimension_2" }
        const response = await getnotes(Equitable_Initiative_popup_dimension_2);
        return response.data
    }
)

export const fetchWholeChild_Initiative_popup_dimension_1 = createAsyncThunk(
    'fetchWholeChild_Initiative_popup_dimension_1',
    async (WholeChild_Initiative_popup_dimension_1, thunkAPI) => {
        WholeChild_Initiative_popup_dimension_1 = { ...WholeChild_Initiative_popup_dimension_1, elasticQueryName: "WholeChild_Initiative_popup_dimension_1" }
        const response = await getnotes(WholeChild_Initiative_popup_dimension_1);
        return response.data
    }
)

export const fetchWholeChild_Initiative_popup_dimension_2 = createAsyncThunk(
    'fetchWholeChild_Initiative_popup_dimension_2',
    async (WholeChild_Initiative_popup_dimension_2, thunkAPI) => {
        WholeChild_Initiative_popup_dimension_2 = { ...WholeChild_Initiative_popup_dimension_2, elasticQueryName: "WholeChild_Initiative_popup_dimension_2" }
        const response = await getnotes(WholeChild_Initiative_popup_dimension_2);
        return response.data
    }
)

export const fetchHighImpact_Initiative_popup_dimension_1 = createAsyncThunk(
    'fetchHighImpact_Initiative_popup_dimension_1',
    async (HighImpact_Initiative_popup_dimension_1, thunkAPI) => {
        HighImpact_Initiative_popup_dimension_1 = { ...HighImpact_Initiative_popup_dimension_1, elasticQueryName: "HighImpact_Initiative_popup_dimension_1" }
        const response = await getnotes(HighImpact_Initiative_popup_dimension_1);
        return response.data
    }
)

export const fetchHighImpact_Initiative_popup_dimension_2 = createAsyncThunk(
    'fetchHighImpact_Initiative_popup_dimension_2',
    async (HighImpact_Initiative_popup_dimension_2, thunkAPI) => {
        HighImpact_Initiative_popup_dimension_2 = { ...HighImpact_Initiative_popup_dimension_2, elasticQueryName: "HighImpact_Initiative_popup_dimension_2" }
        const response = await getnotes(HighImpact_Initiative_popup_dimension_2);
        return response.data
    }
)

export const fetchHighImpact_Initiative_popup_dimension_3 = createAsyncThunk(
    'fetchHighImpact_Initiative_popup_dimension_3',
    async (HighImpact_Initiative_popup_dimension_3, thunkAPI) => {
        HighImpact_Initiative_popup_dimension_3 = { ...HighImpact_Initiative_popup_dimension_3, elasticQueryName: "HighImpact_Initiative_popup_dimension_3" }
        const response = await getnotes(HighImpact_Initiative_popup_dimension_3);
        return response.data
    }
)

export const fetchHigh_Impact_Plan_of_Action = createAsyncThunk(
    'fetchHigh_Impact_Plan_of_Action',
    async (High_Impact_Plan_of_Action, thunkAPI) => {
        High_Impact_Plan_of_Action = { ...High_Impact_Plan_of_Action, elasticQueryName: "High_Impact_Plan_of_Action" }
        const response = await getnotes(High_Impact_Plan_of_Action);
        return response.data
    }
)

export const fetchWhole_Child_Environment_Plan_of_Actions = createAsyncThunk(
    'fetchWhole_Child_Environment_Plan_of_Actions',
    async (Whole_Child_Environment_Plan_of_Actions, thunkAPI) => {
        Whole_Child_Environment_Plan_of_Actions = { ...Whole_Child_Environment_Plan_of_Actions, elasticQueryName: "Whole_Child_Environment_Plan_of_Actions" }
        const response = await getnotes(Whole_Child_Environment_Plan_of_Actions);
        return response.data
    }
)

export const fetchEquitable_Opportunity_Plan_of_Action = createAsyncThunk(
    'fetchEquitable_Opportunity_Plan_of_Action',
    async (Equitable_Opportunity_Plan_of_Action, thunkAPI) => {
        Equitable_Opportunity_Plan_of_Action = { ...Equitable_Opportunity_Plan_of_Action, elasticQueryName: "Equitable_Opportunity_Plan_of_Action" }
        const response = await getnotes(Equitable_Opportunity_Plan_of_Action);
        return response.data
    }
)

export const fetchCulture_Excellence_Plan_of_Action = createAsyncThunk(
    'fetchCulture_Excellence_Plan_of_Action',
    async (Culture_Excellence_Plan_of_Action, thunkAPI) => {
        Culture_Excellence_Plan_of_Action = { ...Culture_Excellence_Plan_of_Action, elasticQueryName: "Culture_Excellence_Plan_of_Action" }
        const response = await getnotes(Culture_Excellence_Plan_of_Action);
        return response.data
    }
)

export const Popup = createSlice({
    name: 'Popup',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCulture_Initiative_popup_dimension_1.fulfilled, (state, action) => {
            state.Culture_Initiative_popup_dimension_1 = action.payload;
            state.Culture_Initiative_popup_dimension_1loading = false;
        }).addCase(fetchCulture_Initiative_popup_dimension_1.pending, (state, action) => {
            state.Culture_Initiative_popup_dimension_1loading = true;
        })

        builder.addCase(fetchCulture_Initiative_popup_dimension_2.fulfilled, (state, action) => {
            state.Culture_Initiative_popup_dimension_2 = action.payload;
            state.Culture_Initiative_popup_dimension_2loading = false;
        }).addCase(fetchCulture_Initiative_popup_dimension_2.pending, (state, action) => {
            state.Culture_Initiative_popup_dimension_2loading = true;
        })
        
        builder.addCase(fetchCulture_Initiative_popup_dimension_3.fulfilled, (state, action) => {
            state.Culture_Initiative_popup_dimension_3 = action.payload;
            state.Stacked_Horizontalloading = false;
        }).addCase(fetchCulture_Initiative_popup_dimension_3.pending, (state, action) => {
            state.Culture_Initiative_popup_dimension_3loading = true;
        })

        builder.addCase(fetchCulture_Initiative_popup_dimension_4.fulfilled, (state, action) => {
            state.Culture_Initiative_popup_dimension_4 = action.payload;
            state.Culture_Initiative_popup_dimension_4loading = false;
        }).addCase(fetchCulture_Initiative_popup_dimension_4.pending, (state, action) => {
            state.Culture_Initiative_popup_dimension_4loading = true;
        })

        builder.addCase(fetchEquitable_Initiative_popup_dimension_1.fulfilled, (state, action) => {
            state.Equitable_Initiative_popup_dimension_1 = action.payload;
            state.Equitable_Initiative_popup_dimension_1loading = false;
        }).addCase(fetchEquitable_Initiative_popup_dimension_1.pending, (state, action) => {
            state.Equitable_Initiative_popup_dimension_1loading = true;
        })

        builder.addCase(fetchEquitable_Initiative_popup_dimension_2.fulfilled, (state, action) => {
            state.Equitable_Initiative_popup_dimension_2 = action.payload;
            state.Equitable_Initiative_popup_dimension_2loading = false;
        }).addCase(fetchEquitable_Initiative_popup_dimension_2.pending, (state, action) => {
            state.Equitable_Initiative_popup_dimension_2loading = true;
        })

        builder.addCase(fetchWholeChild_Initiative_popup_dimension_1.fulfilled, (state, action) => {
            state.WholeChild_Initiative_popup_dimension_1 = action.payload;
            state.WholeChild_Initiative_popup_dimension_1loading = false;
        }).addCase(fetchWholeChild_Initiative_popup_dimension_1.pending, (state, action) => {
            state.WholeChild_Initiative_popup_dimension_1loading = true;
        })

        builder.addCase(fetchWholeChild_Initiative_popup_dimension_2.fulfilled, (state, action) => {
            state.WholeChild_Initiative_popup_dimension_2 = action.payload;
            state.WholeChild_Initiative_popup_dimension_2loading = false;
        }).addCase(fetchWholeChild_Initiative_popup_dimension_2.pending, (state, action) => {
            state.WholeChild_Initiative_popup_dimension_2loading = true;
        })

        builder.addCase(fetchHighImpact_Initiative_popup_dimension_1.fulfilled, (state, action) => {
            state.HighImpact_Initiative_popup_dimension_1 = action.payload;
            state.HighImpact_Initiative_popup_dimension_1loading = false;
        }).addCase(fetchHighImpact_Initiative_popup_dimension_1.pending, (state, action) => {
            state.HighImpact_Initiative_popup_dimension_1loading = true;
        })

        builder.addCase(fetchHighImpact_Initiative_popup_dimension_2.fulfilled, (state, action) => {
            state.HighImpact_Initiative_popup_dimension_2 = action.payload;
            state.HighImpact_Initiative_popup_dimension_2loading = false;
        }).addCase(fetchHighImpact_Initiative_popup_dimension_2.pending, (state, action) => {
            state.HighImpact_Initiative_popup_dimension_2loading = true;
        })

        builder.addCase(fetchHighImpact_Initiative_popup_dimension_3.fulfilled, (state, action) => {
            state.HighImpact_Initiative_popup_dimension_3 = action.payload;
            state.HighImpact_Initiative_popup_dimension_3loading = false;
        }).addCase(fetchHighImpact_Initiative_popup_dimension_3.pending, (state, action) => {
            state.HighImpact_Initiative_popup_dimension_3loading = true;
        })

        builder.addCase(fetchHigh_Impact_Plan_of_Action.fulfilled, (state, action) => {
            state.High_Impact_Plan_of_Action = action.payload;
            state.High_Impact_Plan_of_Actionloading = false;
        }).addCase(fetchHigh_Impact_Plan_of_Action.pending, (state, action) => {
            state.High_Impact_Plan_of_Actionloading = true;
        })


        builder.addCase(fetchWhole_Child_Environment_Plan_of_Actions.fulfilled, (state, action) => {
            state.Whole_Child_Environment_Plan_of_Actions = action.payload;
            state.Whole_Child_Environment_Plan_of_Actionsloading = false;
        }).addCase(fetchWhole_Child_Environment_Plan_of_Actions.pending, (state, action) => {
            state.Whole_Child_Environment_Plan_of_Actionsloading = true;
        })


        builder.addCase(fetchEquitable_Opportunity_Plan_of_Action.fulfilled, (state, action) => {
            state.Equitable_Opportunity_Plan_of_Action = action.payload;
            state.Equitable_Opportunity_Plan_of_Actionloading = false;
        }).addCase(fetchEquitable_Opportunity_Plan_of_Action.pending, (state, action) => {
            state.Equitable_Opportunity_Plan_of_Actionloading = true;
        })


        builder.addCase(fetchCulture_Excellence_Plan_of_Action.fulfilled, (state, action) => {
            state.Culture_Excellence_Plan_of_Action = action.payload;
            state.Culture_Excellence_Plan_of_Actionloading = false;
        }).addCase(fetchCulture_Excellence_Plan_of_Action.pending, (state, action) => {
            state.Culture_Excellence_Plan_of_Actionloading = true;
        })
    }
})

export default Popup.reducer