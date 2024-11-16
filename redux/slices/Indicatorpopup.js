import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getnotes } from '../services/user'


const initialState = {
    Assessment_Reading_Popup_dimensionloading: true,
    Assessment_Reading_Popup_dimension: [],

    Assessment_Mathematics_Popup_dimensionloading: true,
    Assessment_Mathematics_Popup_dimension: [],

    State_Assessment_ELA_Popup_dimensionloading: true,
    State_Assessment_ELA_Popup_dimension: [],

    State_Assessment_Mathematics_Popup_dimensionloading: true,
    State_Assessment_Mathematics_Popup_dimension: [],

    Freshmen_on_Track_Popup_dimensionloading: true,
    Freshmen_on_Track_Popup_dimension: [],

    Graduation_Rate_Popup_dimensionloading: true,
    Graduation_Rate_Popup_dimension: [],

    Advanced_Placement_Popup_dimensionloading: true,
    Advanced_Placement_Popup_dimension: [],

    SAT_Assessment_Popup_dimensionloading: true,
    SAT_Assessment_Popup_dimension: [],

    Chronic_Absenteeism_Popup_dimensionloading: true,
    Chronic_Absenteeism_Popup_dimension: [],

    Student_Belonging_Popup_dimensionloading: true,
    Student_Belonging_Popup_dimension: [],

    OSS_Suspensions_Toptile_Popup_dimensionloading: true,
    OSS_Suspensions_Toptile_Popup_dimension: [],

    Staff_Engagement_Popup_dimensionloading: true,
    Staff_Engagement_Popup_dimension: [],

    Staff_DIversity_Popup_dimensionloading: true,
    Staff_DIversity_Popup_dimension: [],

    Staff_Retention_Popup_dimensionloading: true,
    Staff_Retention_Popup_dimension: [],

    Fund_Balance_Toptile_Popup_dimensionloading: true,
    Fund_Balance_Toptile_Popup_dimension: [],
}


export const fetchAssessment_Reading_Popup_dimension = createAsyncThunk(
    'fetchAssessment_Reading_Popup_dimension',
    async (Assessment_Reading_Popup_dimension, thunkAPI) => {
        Assessment_Reading_Popup_dimension = { ...Assessment_Reading_Popup_dimension, elasticQueryName: "Assessment_Reading_Popup_dimension" }
        const response = await getnotes(Assessment_Reading_Popup_dimension);
        return response.data
    }
)

export const fetchAssessment_Mathematics_Popup_dimension = createAsyncThunk(
    'fetchAssessment_Mathematics_Popup_dimension',
    async (Assessment_Mathematics_Popup_dimension, thunkAPI) => {
        Assessment_Mathematics_Popup_dimension = { ...Assessment_Mathematics_Popup_dimension, elasticQueryName: "Assessment_Mathematics_Popup_dimension" }
        const response = await getnotes(Assessment_Mathematics_Popup_dimension);
        return response.data
    }
)

export const fetchState_Assessment_ELA_Popup_dimension = createAsyncThunk(
    'fetchState_Assessment_ELA_Popup_dimension',
    async (State_Assessment_ELA_Popup_dimension, thunkAPI) => {
        State_Assessment_ELA_Popup_dimension = { ...State_Assessment_ELA_Popup_dimension, elasticQueryName: "State_Assessment_ELA_Popup_dimension" }
        const response = await getnotes(State_Assessment_ELA_Popup_dimension);
        return response.data
    }
)

export const fetchState_Assessment_Mathematics_Popup_dimension = createAsyncThunk(
    'fetchState_Assessment_Mathematics_Popup_dimension',
    async (State_Assessment_Mathematics_Popup_dimension, thunkAPI) => {
        State_Assessment_Mathematics_Popup_dimension = { ...State_Assessment_Mathematics_Popup_dimension, elasticQueryName: "State_Assessment_Mathematics_Popup_dimension" }
        const response = await getnotes(State_Assessment_Mathematics_Popup_dimension);
        return response.data
    }
)

export const fetchFreshmen_on_Track_Popup_dimension = createAsyncThunk(
    'fetchFreshmen_on_Track_Popup_dimension',
    async (Freshmen_on_Track_Popup_dimension, thunkAPI) => {
        Freshmen_on_Track_Popup_dimension = { ...Freshmen_on_Track_Popup_dimension, elasticQueryName: "Freshmen_on_Track_Popup_dimension" }
        const response = await getnotes(Freshmen_on_Track_Popup_dimension);
        return response.data
    }
)

export const fetchGraduation_Rate_Popup_dimension = createAsyncThunk(
    'fetchGraduation_Rate_Popup_dimension',
    async (Graduation_Rate_Popup_dimension, thunkAPI) => {
        Graduation_Rate_Popup_dimension = { ...Graduation_Rate_Popup_dimension, elasticQueryName: "Graduation_Rate_Popup_dimension" }
        const response = await getnotes(Graduation_Rate_Popup_dimension);
        return response.data
    }
)

export const fetchAdvanced_Placement_Popup_dimension = createAsyncThunk(
    'fetchAdvanced_Placement_Popup_dimension',
    async (Advanced_Placement_Popup_dimension, thunkAPI) => {
        Advanced_Placement_Popup_dimension = { ...Advanced_Placement_Popup_dimension, elasticQueryName: "Advanced_Placement_Popup_dimension" }
        const response = await getnotes(Advanced_Placement_Popup_dimension);
        return response.data
    }
)

export const fetchSAT_Assessment_Popup_dimension = createAsyncThunk(
    'fetchSAT_Assessment_Popup_dimension',
    async (SAT_Assessment_Popup_dimension, thunkAPI) => {
        SAT_Assessment_Popup_dimension = { ...SAT_Assessment_Popup_dimension, elasticQueryName: "SAT_Assessment_Popup_dimension" }
        const response = await getnotes(SAT_Assessment_Popup_dimension);
        return response.data
    }
)

export const fetchChronic_Absenteeism_Popup_dimension = createAsyncThunk(
    'fetchChronic_Absenteeism_Popup_dimension',
    async (Chronic_Absenteeism_Popup_dimension, thunkAPI) => {
        Chronic_Absenteeism_Popup_dimension = { ...Chronic_Absenteeism_Popup_dimension, elasticQueryName: "Chronic_Absenteeism_Popup_dimension" }
        const response = await getnotes(Chronic_Absenteeism_Popup_dimension);
        return response.data
    }
)

export const fetchStudent_Belonging_Popup_dimension = createAsyncThunk(
    'fetchStudent_Belonging_Popup_dimension',
    async (Student_Belonging_Popup_dimension, thunkAPI) => {
        Student_Belonging_Popup_dimension = { ...Student_Belonging_Popup_dimension, elasticQueryName: "Student_Belonging_Popup_dimension" }
        const response = await getnotes(Student_Belonging_Popup_dimension);
        return response.data
    }
)

export const fetchOSS_Suspensions_Toptile_Popup_dimension = createAsyncThunk(
    'fetchOSS_Suspensions_Toptile_Popup_dimension',
    async (OSS_Suspensions_Toptile_Popup_dimension, thunkAPI) => {
        OSS_Suspensions_Toptile_Popup_dimension = { ...OSS_Suspensions_Toptile_Popup_dimension, elasticQueryName: "OSS_Suspensions_Toptile_Popup_dimension" }
        const response = await getnotes(OSS_Suspensions_Toptile_Popup_dimension);
        return response.data
    }
)

export const fetchStaff_Engagement_Popup_dimension = createAsyncThunk(
    'fetchStaff_Engagement_Popup_dimension',
    async (Staff_Engagement_Popup_dimension, thunkAPI) => {
        Staff_Engagement_Popup_dimension = { ...Staff_Engagement_Popup_dimension, elasticQueryName: "Staff_Engagement_Popup_dimension" }
        const response = await getnotes(Staff_Engagement_Popup_dimension);
        return response.data
    }
)

export const fetchStaff_DIversity_Popup_dimension = createAsyncThunk(
    'fetchStaff_DIversity_Popup_dimension',
    async (Staff_DIversity_Popup_dimension, thunkAPI) => {
        Staff_DIversity_Popup_dimension = { ...Staff_DIversity_Popup_dimension, elasticQueryName: "Staff_DIversity_Popup_dimension" }
        const response = await getnotes(Staff_DIversity_Popup_dimension);
        return response.data
    }
)

export const fetchStaff_Retention_Popup_dimension = createAsyncThunk(
    'fetchStaff_Retention_Popup_dimension',
    async (Staff_Retention_Popup_dimension, thunkAPI) => {
        Staff_Retention_Popup_dimension = { ...Staff_Retention_Popup_dimension, elasticQueryName: "Staff_Retention_Popup_dimension" }
        const response = await getnotes(Staff_Retention_Popup_dimension);
        return response.data
    }
)

export const fetchFund_Balance_Toptile_Popup_dimension = createAsyncThunk(
    'fetchFund_Balance_Toptile_Popup_dimension',
    async (Fund_Balance_Toptile_Popup_dimension, thunkAPI) => {
        Fund_Balance_Toptile_Popup_dimension = { ...Fund_Balance_Toptile_Popup_dimension, elasticQueryName: "Fund_Balance_Toptile_Popup_dimension" }
        const response = await getnotes(Fund_Balance_Toptile_Popup_dimension);
        return response.data
    }
)


export const Indicatorpopup = createSlice({
    name: 'indicatorpopup',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAssessment_Reading_Popup_dimension.fulfilled, (state, action) => {
            state.Assessment_Reading_Popup_dimension = action.payload;
            state.Assessment_Reading_Popup_dimensionloading = false;
        }).addCase(fetchAssessment_Reading_Popup_dimension.pending, (state, action) => {
            state.Assessment_Reading_Popup_dimensionloading = true;
        })

        builder.addCase(fetchAssessment_Mathematics_Popup_dimension.fulfilled, (state, action) => {
            state.Assessment_Mathematics_Popup_dimension = action.payload;
            state.Assessment_Mathematics_Popup_dimensionloading = false;
        }).addCase(fetchAssessment_Mathematics_Popup_dimension.pending, (state, action) => {
            state.Assessment_Mathematics_Popup_dimensionloading = true;
        })

        builder.addCase(fetchState_Assessment_ELA_Popup_dimension.fulfilled, (state, action) => {
            state.State_Assessment_ELA_Popup_dimension = action.payload;
            state.State_Assessment_ELA_Popup_dimensionloading = false;
        }).addCase(fetchState_Assessment_ELA_Popup_dimension.pending, (state, action) => {
            state.State_Assessment_ELA_Popup_dimensionloading = true;
        })

        builder.addCase(fetchState_Assessment_Mathematics_Popup_dimension.fulfilled, (state, action) => {
            state.State_Assessment_Mathematics_Popup_dimension = action.payload;
            state.State_Assessment_Mathematics_Popup_dimensionloading = false;
        }).addCase(fetchState_Assessment_Mathematics_Popup_dimension.pending, (state, action) => {
            state.State_Assessment_Mathematics_Popup_dimensionloading = true;
        })

        builder.addCase(fetchFreshmen_on_Track_Popup_dimension.fulfilled, (state, action) => {
            state.Freshmen_on_Track_Popup_dimension = action.payload;
            state.Freshmen_on_Track_Popup_dimensionloading = false;
        }).addCase(fetchFreshmen_on_Track_Popup_dimension.pending, (state, action) => {
            state.Freshmen_on_Track_Popup_dimensionloading = true;
        })

        builder.addCase(fetchGraduation_Rate_Popup_dimension.fulfilled, (state, action) => {
            state.Graduation_Rate_Popup_dimension = action.payload;
            state.Graduation_Rate_Popup_dimensionloading = false;
        }).addCase(fetchGraduation_Rate_Popup_dimension.pending, (state, action) => {
            state.Graduation_Rate_Popup_dimensionloading = true;
        })

        builder.addCase(fetchAdvanced_Placement_Popup_dimension.fulfilled, (state, action) => {
            state.Advanced_Placement_Popup_dimension = action.payload;
            state.Advanced_Placement_Popup_dimensionloading = false;
        }).addCase(fetchAdvanced_Placement_Popup_dimension.pending, (state, action) => {
            state.Advanced_Placement_Popup_dimensionloading = true;
        })

        builder.addCase(fetchSAT_Assessment_Popup_dimension.fulfilled, (state, action) => {
            state.SAT_Assessment_Popup_dimension = action.payload;
            state.SAT_Assessment_Popup_dimensionloading = false;
        }).addCase(fetchSAT_Assessment_Popup_dimension.pending, (state, action) => {
            state.SAT_Assessment_Popup_dimensionloading = true;
        })

        builder.addCase(fetchChronic_Absenteeism_Popup_dimension.fulfilled, (state, action) => {
            state.Chronic_Absenteeism_Popup_dimension = action.payload;
            state.Chronic_Absenteeism_Popup_dimensionloading = false;
        }).addCase(fetchChronic_Absenteeism_Popup_dimension.pending, (state, action) => {
            state.Chronic_Absenteeism_Popup_dimensionloading = true;
        })

        builder.addCase(fetchStudent_Belonging_Popup_dimension.fulfilled, (state, action) => {
            state.Student_Belonging_Popup_dimension = action.payload;
            state.Student_Belonging_Popup_dimensionloading = false;
        }).addCase(fetchStudent_Belonging_Popup_dimension.pending, (state, action) => {
            state.Student_Belonging_Popup_dimensionloading = true;
        })

        builder.addCase(fetchOSS_Suspensions_Toptile_Popup_dimension.fulfilled, (state, action) => {
            state.OSS_Suspensions_Toptile_Popup_dimension = action.payload;
            state.OSS_Suspensions_Toptile_Popup_dimensionloading = false;
        }).addCase(fetchOSS_Suspensions_Toptile_Popup_dimension.pending, (state, action) => {
            state.OSS_Suspensions_Toptile_Popup_dimensionloading = true;
        })

        builder.addCase(fetchStaff_DIversity_Popup_dimension.fulfilled, (state, action) => {
            state.Staff_DIversity_Popup_dimension = action.payload;
            state.Staff_DIversity_Popup_dimensionloading = false;
        }).addCase(fetchStaff_DIversity_Popup_dimension.pending, (state, action) => {
            state.Staff_DIversity_Popup_dimensionloading = true;
        })

        builder.addCase(fetchStaff_Retention_Popup_dimension.fulfilled, (state, action) => {
            state.Staff_Retention_Popup_dimension = action.payload;
            state.Staff_Retention_Popup_dimensionloading = false;
        }).addCase(fetchStaff_Retention_Popup_dimension.pending, (state, action) => {
            state.Staff_Retention_Popup_dimensionloading = true;
        })

        builder.addCase(fetchFund_Balance_Toptile_Popup_dimension.fulfilled, (state, action) => {
            state.Fund_Balance_Toptile_Popup_dimension = action.payload;
            state.Fund_Balance_Toptile_Popup_dimensionloading = false;
        }).addCase(fetchFund_Balance_Toptile_Popup_dimension.pending, (state, action) => {
            state.Fund_Balance_Toptile_Popup_dimensionloading = true;
        })

        builder.addCase(fetchStaff_Engagement_Popup_dimension.fulfilled, (state, action) => {
            state.Staff_Engagement_Popup_dimension = action.payload;
            state.Staff_Engagement_Popup_dimensionloading = false;
        }).addCase(fetchStaff_Engagement_Popup_dimension.pending, (state, action) => {
            state.Staff_Engagement_Popup_dimensionloading = true;
        })
    }
})
export default Indicatorpopup.reducer
