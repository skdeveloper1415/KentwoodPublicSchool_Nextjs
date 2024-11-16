import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getnotes } from '../services/user'


const initialState = {

    Stacked_Horizontalloading: true,
    Stacked_Horizontal: [],

    Speedometerloading: true,
    Speedometer: [],

    Culture_Key_Initiative_Barloading: true,
    Culture_Key_Initiative_Bar: [],

    Culture_Key_Initiative_Toptileloading: true,
    Culture_Key_Initiative_Toptile: [],

    Equitable_Key_Initiative_Barloading: true,
    Equitable_Key_Initiative_Bar: [],

    Equitable_Key_Initiative_Toptileloading: true,
    Equitable_Key_Initiative_Toptile: [],

    Whole_Child_Key_Initiative_Barloading: true,
    Whole_Child_Key_Initiative_Bar: [],

    Whole_Child_Key_Initiative_Toptileloading: true,
    Whole_Child_Key_Initiative_Toptile: [],

    High_Impact_Key_Initiative_Barloading: true,
    High_Impact_Key_Initiative_Bar: [],

    High_Impact_Key_Initiative_Toptileloading: true,
    High_Impact_Key_Initiative_Toptile: [],

    Benchmark_Assessment_Reading_Toptileloading: true,
    Benchmark_Assessment_Reading_Toptile: [],

    Benchmark_Assessment_Reading_Barloading: true,
    Benchmark_Assessment_Reading_Bar: [],

    Benchmark_Assessment_Mathematics_Toptileloading: true,
    Benchmark_Assessment_Mathematics_Toptile: [],

    Benchmark_Assessment_Mathematics_Barloading: true,
    Benchmark_Assessment_Mathematics_Bar: [],

    State_Assessment_ELA_Toptileloading: true,
    State_Assessment_ELA_Toptile: [],

    State_Assessment_ELA_Barloading: true,
    State_Assessment_ELA_Bar: [],

    Freshmen_on_Track_Toptileloading: true,
    Freshmen_on_Track_Toptile: [],

    Freshmen_on_Track_Barloading: true,
    Freshmen_on_Track_Bar: [],

    Graduation_Rate_Toptileloading: true,
    Graduation_Rate_Toptile: [],

    Graduation_Rate_Barloading: true,
    Graduation_Rate_Bar: [],

    Advanced_Placement_Toptileloading: true,
    Advanced_Placement_Toptile: [],

    Advanced_Placement_Barloading: true,
    Advanced_Placement_Bar: [],

    SAT_Assessment_Toptileloading: true,
    SAT_Assessment_Toptile: [],

    SAT_Assessment_Barloading: true,
    SAT_Assessment_Bar: [],

    Chronic_Absenteeism_Toptileloading: true,
    Chronic_Absenteeism_Toptile: [],

    Chronic_Absenteeism_Barloading: true,
    Chronic_Absenteeism_Bar: [],

    Student_Belonging_Toptileloading: true,
    Student_Belonging_Toptile: [],

    Student_Belonging_Barloading: true,
    Student_Belonging_Bar: [],

    Out_of_School_Suspensions_Toptileloading: true,
    Out_of_School_Suspensions_Toptile: [],

    Out_of_School_Suspensions_Barloading: true,
    Out_of_School_Suspensions_Bar: [],

    Staff_Engagement_Toptileloading: true,
    Staff_Engagement_Toptile: [],

    Staff_Engagement_Barloading: true,
    Staff_Engagement_Bar: [],

    Staff_DIversity_Toptileloading: true,
    Staff_DIversity_Toptile: [],

    Staff_DIversity_Barloading: true,
    Staff_DIversity_Bar: [],

    Staff_Retention_Toptileloading: true,
    Staff_Retention_Toptile: [],

    Staff_Retention_Barloading: true,
    Staff_Retention_Bar: [],

    Fund_Balance_Toptileloading: true,
    Fund_Balance_Toptile: [],

    Fund_Balance_Barloading: true,
    Fund_Balance_Bar: [],

    State_Assessment_Mathematics_Toptileloading: true,
    State_Assessment_Mathematics_Toptile: [],

    State_Assessment_Mathematics_Barloading: true,
    State_Assessment_Mathematics_Bar: [],

    Footer_Queryloading: true,
    Footer_Query: [],
}

export const fetchStacked_Horizontal = createAsyncThunk(
    'fetchStacked_Horizontal',
    async (Stacked_Horizontal, thunkAPI) => {
        Stacked_Horizontal = { ...Stacked_Horizontal, elasticQueryName: "Stacked_Horizontal" }
        const response = await getnotes(Stacked_Horizontal);
        return response.data
    }
)

export const fetchSpeedometer = createAsyncThunk(
    'fetchSpeedometer',
    async (Speedometer, thunkAPI) => {
        Speedometer = { ...Speedometer, elasticQueryName: "Speedometer" }
        const response = await getnotes(Speedometer);
        return response.data
    }
)

export const fetchCulture_Key_Initiative_Bar = createAsyncThunk(
    'fetchCulture_Key_Initiative_Bar',
    async (Culture_Key_Initiative_Bar, thunkAPI) => {
        Culture_Key_Initiative_Bar = { ...Culture_Key_Initiative_Bar, elasticQueryName: "Culture_Key_Initiative_Bar" }
        const response = await getnotes(Culture_Key_Initiative_Bar);
        return response.data
    }
)

export const fetchCulture_Key_Initiative_Toptile = createAsyncThunk(
    'fetchCulture_Key_Initiative_Toptile',
    async (Culture_Key_Initiative_Toptile, thunkAPI) => {
        Culture_Key_Initiative_Toptile = { ...Culture_Key_Initiative_Toptile, elasticQueryName: "Culture_Key_Initiative_Toptile" }
        const response = await getnotes(Culture_Key_Initiative_Toptile);
        return response.data
    }
)

export const fetchEquitable_Key_Initiative_Bar = createAsyncThunk(
    'fetchEquitable_Key_Initiative_Bar',
    async (Equitable_Key_Initiative_Bar, thunkAPI) => {
        Equitable_Key_Initiative_Bar = { ...Equitable_Key_Initiative_Bar, elasticQueryName: "Equitable_Key_Initiative_Bar" }
        const response = await getnotes(Equitable_Key_Initiative_Bar);
        return response.data
    }
)

export const fetchEquitable_Key_Initiative_Toptile = createAsyncThunk(
    'fetchEquitable_Key_Initiative_Toptile',
    async (Equitable_Key_Initiative_Toptile, thunkAPI) => {
        Equitable_Key_Initiative_Toptile = { ...Equitable_Key_Initiative_Toptile, elasticQueryName: "Equitable_Key_Initiative_Toptile" }
        const response = await getnotes(Equitable_Key_Initiative_Toptile);
        return response.data
    }
)

export const fetchWhole_Child_Key_Initiative_Bar = createAsyncThunk(
    'fetchWhole_Child_Key_Initiative_Bar',
    async (Whole_Child_Key_Initiative_Bar, thunkAPI) => {
        Whole_Child_Key_Initiative_Bar = { ...Whole_Child_Key_Initiative_Bar, elasticQueryName: "Whole_Child_Key_Initiative_Bar" }
        const response = await getnotes(Whole_Child_Key_Initiative_Bar);
        return response.data
    }
)

export const fetchWhole_Child_Key_Initiative_Toptile = createAsyncThunk(
    'fetchWhole_Child_Key_Initiative_Toptile',
    async (Whole_Child_Key_Initiative_Toptile, thunkAPI) => {
        Whole_Child_Key_Initiative_Toptile = { ...Whole_Child_Key_Initiative_Toptile, elasticQueryName: "Whole_Child_Key_Initiative_Toptile" }
        const response = await getnotes(Whole_Child_Key_Initiative_Toptile);
        return response.data
    }
)

export const fetchHigh_Impact_Key_Initiative_Bar = createAsyncThunk(
    'fetchHigh_Impact_Key_Initiative_Bar',
    async (High_Impact_Key_Initiative_Bar, thunkAPI) => {
        High_Impact_Key_Initiative_Bar = { ...High_Impact_Key_Initiative_Bar, elasticQueryName: "High_Impact_Key_Initiative_Bar" }
        const response = await getnotes(High_Impact_Key_Initiative_Bar);
        return response.data
    }
)

export const fetchHigh_Impact_Key_Initiative_Toptile = createAsyncThunk(
    'fetchHigh_Impact_Key_Initiative_Toptile',
    async (High_Impact_Key_Initiative_Toptile, thunkAPI) => {
        High_Impact_Key_Initiative_Toptile = { ...High_Impact_Key_Initiative_Toptile, elasticQueryName: "High_Impact_Key_Initiative_Toptile" }
        const response = await getnotes(High_Impact_Key_Initiative_Toptile);
        return response.data
    }
)

export const fetchBenchmark_Assessment_Reading_Toptile = createAsyncThunk(
    'fetchBenchmark_Assessment_Reading_Toptile',
    async (Benchmark_Assessment_Reading_Toptile, thunkAPI) => {
        Benchmark_Assessment_Reading_Toptile = { ...Benchmark_Assessment_Reading_Toptile, elasticQueryName: "Benchmark_Assessment_Reading_Toptile" }
        const response = await getnotes(Benchmark_Assessment_Reading_Toptile);
        return response.data
    }
)

export const fetchBenchmark_Assessment_Reading_Bar = createAsyncThunk(
    'fetchBenchmark_Assessment_Reading_Bar',
    async (Benchmark_Assessment_Reading_Bar, thunkAPI) => {
        Benchmark_Assessment_Reading_Bar = { ...Benchmark_Assessment_Reading_Bar, elasticQueryName: "Benchmark_Assessment_Reading_Bar" }
        const response = await getnotes(Benchmark_Assessment_Reading_Bar);
        return response.data
    }
)

export const fetchBenchmark_Assessment_Mathematics_Toptile = createAsyncThunk(
    'fetchBenchmark_Assessment_Mathematics_Toptile',
    async (Benchmark_Assessment_Mathematics_Toptile, thunkAPI) => {
        Benchmark_Assessment_Mathematics_Toptile = { ...Benchmark_Assessment_Mathematics_Toptile, elasticQueryName: "Benchmark_Assessment_Mathematics_Toptile" }   
        const response = await getnotes(Benchmark_Assessment_Mathematics_Toptile);
        return response.data
    }
)

export const fetchBenchmark_Assessment_Mathematics_Bar = createAsyncThunk(
    'fetchBenchmark_Assessment_Mathematics_Bar',
    async (Benchmark_Assessment_Mathematics_Bar, thunkAPI) => {
        Benchmark_Assessment_Mathematics_Bar = { ...Benchmark_Assessment_Mathematics_Bar, elasticQueryName: "Benchmark_Assessment_Mathematics_Bar" }
        const response = await getnotes(Benchmark_Assessment_Mathematics_Bar);
        return response.data
    }
)

export const fetchState_Assessment_ELA_Toptile = createAsyncThunk(
    'fetchState_Assessment_ELA_Toptile',
    async (State_Assessment_ELA_Toptile, thunkAPI) => {
        State_Assessment_ELA_Toptile = { ...State_Assessment_ELA_Toptile, elasticQueryName: "State_Assessment_ELA_Toptile" }
        const response = await getnotes(State_Assessment_ELA_Toptile);
        return response.data
    }
)

export const fetchState_Assessment_ELA_Bar = createAsyncThunk(
    'fetchState_Assessment_ELA_Bar',
    async (State_Assessment_ELA_Bar, thunkAPI) => {
        State_Assessment_ELA_Bar = { ...State_Assessment_ELA_Bar, elasticQueryName: "State_Assessment_ELA_Bar" }
        const response = await getnotes(State_Assessment_ELA_Bar);
        return response.data
    }
)

export const fetchFreshmen_on_Track_Toptile = createAsyncThunk(
    'fetchFreshmen_on_Track_Toptile',
    async (Freshmen_on_Track_Toptile, thunkAPI) => {
        Freshmen_on_Track_Toptile = { ...Freshmen_on_Track_Toptile, elasticQueryName: "Freshmen_on_Track_Toptile" }
        const response = await getnotes(Freshmen_on_Track_Toptile);
        return response.data
    }
)

export const fetchFreshmen_on_Track_Bar = createAsyncThunk(
    'fetchFreshmen_on_Track_Bar',
    async (Freshmen_on_Track_Bar, thunkAPI) => {
        Freshmen_on_Track_Bar = { ...Freshmen_on_Track_Bar, elasticQueryName: "Freshmen_on_Track_Bar" }
        const response = await getnotes(Freshmen_on_Track_Bar);
        return response.data
    }
)

export const fetchGraduation_Rate_Toptile = createAsyncThunk(
    'fetchGraduation_Rate_Toptile',
    async (Graduation_Rate_Toptile, thunkAPI) => {
        Graduation_Rate_Toptile = { ...Graduation_Rate_Toptile, elasticQueryName: "Graduation_Rate_Toptile" }
        const response = await getnotes(Graduation_Rate_Toptile);
        return response.data
    }
)

export const fetchGraduation_Rate_Bar = createAsyncThunk(
    'fetchGraduation_Rate_Bar',
    async (Graduation_Rate_Bar, thunkAPI) => {
        Graduation_Rate_Bar = { ...Graduation_Rate_Bar, elasticQueryName: "Graduation_Rate_Bar" }
        const response = await getnotes(Graduation_Rate_Bar);
        return response.data
    }
)

export const fetchAdvanced_Placement_Toptile = createAsyncThunk(
    'fetchAdvanced_Placement_Toptile',
    async (Advanced_Placement_Toptile, thunkAPI) => {
        Advanced_Placement_Toptile = { ...Advanced_Placement_Toptile, elasticQueryName: "Advanced_Placement_Toptile" }
        const response = await getnotes(Advanced_Placement_Toptile);
        return response.data
    }
)

export const fetchAdvanced_Placement_Bar = createAsyncThunk(
    'fetchAdvanced_Placement_Bar',
    async (Advanced_Placement_Bar, thunkAPI) => {
        Advanced_Placement_Bar = { ...Advanced_Placement_Bar, elasticQueryName: "Advanced_Placement_Bar" }
        const response = await getnotes(Advanced_Placement_Bar);
        return response.data
    }
)

export const fetchSAT_Assessment_Toptile = createAsyncThunk(
    'fetchSAT_Assessment_Toptile',
    async (SAT_Assessment_Toptile, thunkAPI) => {
        SAT_Assessment_Toptile = { ...SAT_Assessment_Toptile, elasticQueryName: "SAT_Assessment_Toptile" }
        const response = await getnotes(SAT_Assessment_Toptile);
        return response.data
    }
)

export const fetchSAT_Assessment_Bar = createAsyncThunk(
    'fetchSAT_Assessment_Bar',
    async (SAT_Assessment_Bar, thunkAPI) => {
        SAT_Assessment_Bar = { ...SAT_Assessment_Bar, elasticQueryName: "SAT_Assessment_Bar" }
        const response = await getnotes(SAT_Assessment_Bar);
        return response.data
    }
)

export const fetchChronic_Absenteeism_Toptile = createAsyncThunk(
    'fetchChronic_Absenteeism_Toptile',
    async (Chronic_Absenteeism_Toptile, thunkAPI) => {
        Chronic_Absenteeism_Toptile = { ...Chronic_Absenteeism_Toptile, elasticQueryName: "Chronic_Absenteeism_Toptile" }
        const response = await getnotes(Chronic_Absenteeism_Toptile);
        return response.data
    }
)

export const fetchChronic_Absenteeism_Bar = createAsyncThunk(
    'fetchChronic_Absenteeism_Bar',
    async (Chronic_Absenteeism_Bar, thunkAPI) => {
        Chronic_Absenteeism_Bar = { ...Chronic_Absenteeism_Bar, elasticQueryName: "Chronic_Absenteeism_Bar" }
        const response = await getnotes(Chronic_Absenteeism_Bar);
        return response.data
    }
)

export const fetchStudent_Belonging_Toptile = createAsyncThunk(
    'fetchStudent_Belonging_Toptile',
    async (Student_Belonging_Toptile, thunkAPI) => {
        Student_Belonging_Toptile = { ...Student_Belonging_Toptile, elasticQueryName: "Student_Belonging_Toptile" }
        const response = await getnotes(Student_Belonging_Toptile);
        return response.data
    }
)

export const fetchStudent_Belonging_Bar = createAsyncThunk(
    'fetchStudent_Belonging_Bar',
    async (Student_Belonging_Bar, thunkAPI) => {
        Student_Belonging_Bar = { ...Student_Belonging_Bar, elasticQueryName: "Student_Belonging_Bar" }
        const response = await getnotes(Student_Belonging_Bar);
        return response.data
    }
)

export const fetchOut_of_School_Suspensions_Toptile = createAsyncThunk(
    'fetchOut_of_School_Suspensions_Toptile',
    async (Out_of_School_Suspensions_Toptile, thunkAPI) => {
        Out_of_School_Suspensions_Toptile = { ...Out_of_School_Suspensions_Toptile, elasticQueryName: "Out_of_School_Suspensions_Toptile" }
        const response = await getnotes(Out_of_School_Suspensions_Toptile);
        return response.data
    }
)

export const fetchOut_of_School_Suspensions_Bar = createAsyncThunk(
    'fetchOut_of_School_Suspensions_Bar',
    async (Out_of_School_Suspensions_Bar, thunkAPI) => {
        Out_of_School_Suspensions_Bar = { ...Out_of_School_Suspensions_Bar, elasticQueryName: "Out_of_School_Suspensions_Bar" }
        const response = await getnotes(Out_of_School_Suspensions_Bar);
        return response.data
    }
)

export const fetchStaff_Engagement_Toptile = createAsyncThunk(
    'fetchStaff_Engagement_Toptile',
    async (Staff_Engagement_Toptile, thunkAPI) => {
        Staff_Engagement_Toptile = { ...Staff_Engagement_Toptile, elasticQueryName: "Staff_Engagement_Toptile" }
        const response = await getnotes(Staff_Engagement_Toptile);
        return response.data
    }
)

export const fetchStaff_Engagement_Bar = createAsyncThunk(
    'fetchStaff_Engagement_Bar',
    async (Staff_Engagement_Bar, thunkAPI) => {
        Staff_Engagement_Bar = { ...Staff_Engagement_Bar, elasticQueryName: "Staff_Engagement_Bar" }
        const response = await getnotes(Staff_Engagement_Bar);
        return response.data
    }
)

export const fetchStaff_DIversity_Toptile = createAsyncThunk(
    'fetchStaff_DIversity_Toptile',
    async (Staff_DIversity_Toptile, thunkAPI) => {
        Staff_DIversity_Toptile = { ...Staff_DIversity_Toptile, elasticQueryName: "Staff_DIversity_Toptile" }
        const response = await getnotes(Staff_DIversity_Toptile);
        return response.data
    }
)

export const fetchStaff_DIversity_Bar = createAsyncThunk(
    'fetchStaff_DIversity_Bar',
    async (Staff_DIversity_Bar, thunkAPI) => {
        Staff_DIversity_Bar = { ...Staff_DIversity_Bar, elasticQueryName: "Staff_DIversity_Bar" }
        const response = await getnotes(Staff_DIversity_Bar);
        return response.data
    }
)

export const fetchStaff_Retention_Toptile = createAsyncThunk(
    'fetchStaff_Retention_Toptile',
    async (Staff_Retention_Toptile, thunkAPI) => {
        Staff_Retention_Toptile = { ...Staff_Retention_Toptile, elasticQueryName: "Staff_Retention_Toptile" }
        const response = await getnotes(Staff_Retention_Toptile);
        return response.data
    }
)

export const fetchStaff_Retention_Bar = createAsyncThunk(
    'fetchStaff_Retention_Bar',
    async (Staff_Retention_Bar, thunkAPI) => {
        Staff_Retention_Bar = { ...Staff_Retention_Bar, elasticQueryName: "Staff_Retention_Bar" }
        const response = await getnotes(Staff_Retention_Bar);
        return response.data
    }
)

export const fetchFund_Balance_Toptile = createAsyncThunk(
    'fetchFund_Balance_Toptile',
    async (Fund_Balance_Toptile, thunkAPI) => {
        Fund_Balance_Toptile = { ...Fund_Balance_Toptile, elasticQueryName: "Fund_Balance_Toptile" }
        const response = await getnotes(Fund_Balance_Toptile);
        return response.data
    }
)

export const fetchFund_Balance_Bar = createAsyncThunk(
    'fetchFund_Balance_Bar',
    async (Fund_Balance_Bar, thunkAPI) => {
        Fund_Balance_Bar = { ...Fund_Balance_Bar, elasticQueryName: "Fund_Balance_Bar" }
        const response = await getnotes(Fund_Balance_Bar);
        return response.data
    }
)

export const fetchState_Assessment_Mathematics_Toptile = createAsyncThunk(
    'fetchState_Assessment_Mathematics_Toptile',
    async (State_Assessment_Mathematics_Toptile, thunkAPI) => {
        State_Assessment_Mathematics_Toptile = { ...State_Assessment_Mathematics_Toptile, elasticQueryName: "State_Assessment_Mathematics_Toptile" }
        const response = await getnotes(State_Assessment_Mathematics_Toptile);
        return response.data
    }
)

export const fetchState_Assessment_Mathematics_Bar = createAsyncThunk(
    'fetchState_Assessment_Mathematics_Bar',
    async (State_Assessment_Mathematics_Bar, thunkAPI) => {
        State_Assessment_Mathematics_Bar = { ...State_Assessment_Mathematics_Bar, elasticQueryName: "State_Assessment_Mathematics_Bar" }
        const response = await getnotes(State_Assessment_Mathematics_Bar);
        return response.data
    }
)

export const fetchFooter_Query = createAsyncThunk(
    'fetchFooter_Query',
    async (Footer_Query, thunkAPI) => {
        Footer_Query = { ...Footer_Query, elasticQueryName: "Footer_Query" }
        const response = await getnotes(Footer_Query);
        return response.data
    }
)

export const Home = createSlice({
    name: 'Home',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchStacked_Horizontal.fulfilled, (state, action) => {
            state.Stacked_Horizontal = action.payload;
            state.Stacked_Horizontalloading = false;
        }).addCase(fetchStacked_Horizontal.pending, (state, action) => {
            state.Stacked_Horizontalloading = true;
        })

        builder.addCase(fetchSpeedometer.fulfilled, (state, action) => {
            state.Speedometer = action.payload;
            state.Speedometerloading = false;
        }).addCase(fetchSpeedometer.pending, (state, action) => {
            state.Speedometerloading = true;
        })

        builder.addCase(fetchCulture_Key_Initiative_Bar.fulfilled, (state, action) => {
            state.Culture_Key_Initiative_Bar = action.payload;
            state.Culture_Key_Initiative_Barloading = false;
        }).addCase(fetchCulture_Key_Initiative_Bar.pending, (state, action) => {
            state.Culture_Key_Initiative_Barloading = true;
        })


        builder.addCase(fetchCulture_Key_Initiative_Toptile.fulfilled, (state, action) => {
            state.Culture_Key_Initiative_Toptile = action.payload;
            state.Culture_Key_Initiative_Toptileloading = false;
        }).addCase(fetchCulture_Key_Initiative_Toptile.pending, (state, action) => {
            state.Culture_Key_Initiative_Toptileloading = true;
        })


        builder.addCase(fetchEquitable_Key_Initiative_Bar.fulfilled, (state, action) => {
            state.Equitable_Key_Initiative_Bar = action.payload;
            state.Equitable_Key_Initiative_Barloading = false;
        }).addCase(fetchEquitable_Key_Initiative_Bar.pending, (state, action) => {
            state.Equitable_Key_Initiative_Barloading = true;
        })


        builder.addCase(fetchEquitable_Key_Initiative_Toptile.fulfilled, (state, action) => {
            state.Equitable_Key_Initiative_Toptile = action.payload;
            state.Equitable_Key_Initiative_Toptileloading = false;
        }).addCase(fetchEquitable_Key_Initiative_Toptile.pending, (state, action) => {
            state.Equitable_Key_Initiative_Toptileloading = true;
        })


        builder.addCase(fetchWhole_Child_Key_Initiative_Bar.fulfilled, (state, action) => {
            state.Whole_Child_Key_Initiative_Bar = action.payload;
            state.Whole_Child_Key_Initiative_Barloading = false;
        }).addCase(fetchWhole_Child_Key_Initiative_Bar.pending, (state, action) => {
            state.Whole_Child_Key_Initiative_Barloading = true;
        })


        builder.addCase(fetchWhole_Child_Key_Initiative_Toptile.fulfilled, (state, action) => {
            state.Whole_Child_Key_Initiative_Toptile = action.payload;
            state.Whole_Child_Key_Initiative_Toptileloading = false;
        }).addCase(fetchWhole_Child_Key_Initiative_Toptile.pending, (state, action) => {
            state.Whole_Child_Key_Initiative_Toptileloading = true;
        })


        builder.addCase(fetchHigh_Impact_Key_Initiative_Bar.fulfilled, (state, action) => {
            state.High_Impact_Key_Initiative_Bar = action.payload;
            state.High_Impact_Key_Initiative_Barloading = false;
        }).addCase(fetchHigh_Impact_Key_Initiative_Bar.pending, (state, action) => {
            state.High_Impact_Key_Initiative_Barloading = true;
        })


        builder.addCase(fetchHigh_Impact_Key_Initiative_Toptile.fulfilled, (state, action) => {
            state.High_Impact_Key_Initiative_Toptile = action.payload;
            state.High_Impact_Key_Initiative_Toptileloading = false;
        }).addCase(fetchHigh_Impact_Key_Initiative_Toptile.pending, (state, action) => {
            state.High_Impact_Key_Initiative_Toptileloading = true;
        })


        builder.addCase(fetchBenchmark_Assessment_Reading_Toptile.fulfilled, (state, action) => {
            state.Benchmark_Assessment_Reading_Toptile = action.payload;
            state.Benchmark_Assessment_Reading_Toptileloading = false;
        }).addCase(fetchBenchmark_Assessment_Reading_Toptile.pending, (state, action) => {
            state.Benchmark_Assessment_Reading_Toptileloading = true;
        })


        builder.addCase(fetchBenchmark_Assessment_Reading_Bar.fulfilled, (state, action) => {
            state.Benchmark_Assessment_Reading_Bar = action.payload;
            state.Benchmark_Assessment_Reading_Barloading = false;
        }).addCase(fetchBenchmark_Assessment_Reading_Bar.pending, (state, action) => {
            state.Benchmark_Assessment_Reading_Barloading = true;
        })


        builder.addCase(fetchBenchmark_Assessment_Mathematics_Toptile.fulfilled, (state, action) => {
            state.Benchmark_Assessment_Mathematics_Toptile = action.payload;
            state.Benchmark_Assessment_Mathematics_Toptileloading = false;
        }).addCase(fetchBenchmark_Assessment_Mathematics_Toptile.pending, (state, action) => {
            state.Benchmark_Assessment_Mathematics_Toptileloading = true;
        })


        builder.addCase(fetchBenchmark_Assessment_Mathematics_Bar.fulfilled, (state, action) => {
            state.Benchmark_Assessment_Mathematics_Bar = action.payload;
            state.Benchmark_Assessment_Mathematics_Barloading = false;
        }).addCase(fetchBenchmark_Assessment_Mathematics_Bar.pending, (state, action) => {
            state.Benchmark_Assessment_Mathematics_Barloading = true;
        })


        builder.addCase(fetchState_Assessment_ELA_Toptile.fulfilled, (state, action) => {
            state.State_Assessment_ELA_Toptile = action.payload;
            state.State_Assessment_ELA_Toptileloading = false;
        }).addCase(fetchState_Assessment_ELA_Toptile.pending, (state, action) => {
            state.State_Assessment_ELA_Toptileloading = true;
        })


        builder.addCase(fetchState_Assessment_ELA_Bar.fulfilled, (state, action) => {
            state.State_Assessment_ELA_Bar = action.payload;
            state.State_Assessment_ELA_Barloading = false;
        }).addCase(fetchState_Assessment_ELA_Bar.pending, (state, action) => {
            state.State_Assessment_ELA_Barloading = true;
        })


        builder.addCase(fetchFreshmen_on_Track_Toptile.fulfilled, (state, action) => {
            state.Freshmen_on_Track_Toptile = action.payload;
            state.Freshmen_on_Track_Toptileloading = false;
        }).addCase(fetchFreshmen_on_Track_Toptile.pending, (state, action) => {
            state.Freshmen_on_Track_Toptileloading = true;
        })


        builder.addCase(fetchFreshmen_on_Track_Bar.fulfilled, (state, action) => {
            state.Freshmen_on_Track_Bar = action.payload;
            state.Freshmen_on_Track_Barloading = false;
        }).addCase(fetchFreshmen_on_Track_Bar.pending, (state, action) => {
            state.Freshmen_on_Track_Barloading = true;
        })


        builder.addCase(fetchGraduation_Rate_Toptile.fulfilled, (state, action) => {
            state.Graduation_Rate_Toptile = action.payload;
            state.Graduation_Rate_Toptileloading = false;
        }).addCase(fetchGraduation_Rate_Toptile.pending, (state, action) => {
            state.Graduation_Rate_Toptileloading = true;
        })


        builder.addCase(fetchGraduation_Rate_Bar.fulfilled, (state, action) => {
            state.Graduation_Rate_Bar = action.payload;
            state.Graduation_Rate_Barloading = false;
        }).addCase(fetchGraduation_Rate_Bar.pending, (state, action) => {
            state.Graduation_Rate_Barloading = true;
        })


        builder.addCase(fetchAdvanced_Placement_Toptile.fulfilled, (state, action) => {
            state.Advanced_Placement_Toptile = action.payload;
            state.Advanced_Placement_Toptileloading = false;
        }).addCase(fetchAdvanced_Placement_Toptile.pending, (state, action) => {
            state.Advanced_Placement_Toptileloading = true;
        })


        builder.addCase(fetchAdvanced_Placement_Bar.fulfilled, (state, action) => {
            state.Advanced_Placement_Bar = action.payload;
            state.Advanced_Placement_Barloading = false;
        }).addCase(fetchAdvanced_Placement_Bar.pending, (state, action) => {
            state.Advanced_Placement_Barloading = true;
        })


        builder.addCase(fetchSAT_Assessment_Toptile.fulfilled, (state, action) => {
            state.SAT_Assessment_Toptile = action.payload;
            state.SAT_Assessment_Toptileloading = false;
        }).addCase(fetchSAT_Assessment_Toptile.pending, (state, action) => {
            state.SAT_Assessment_Toptileloading = true;
        })


        builder.addCase(fetchSAT_Assessment_Bar.fulfilled, (state, action) => {
            state.SAT_Assessment_Bar = action.payload;
            state.SAT_Assessment_Barloading = false;
        }).addCase(fetchSAT_Assessment_Bar.pending, (state, action) => {
            state.SAT_Assessment_Barloading = true;
        })


        builder.addCase(fetchChronic_Absenteeism_Toptile.fulfilled, (state, action) => {
            state.Chronic_Absenteeism_Toptile = action.payload;
            state.Chronic_Absenteeism_Toptileloading = false;
        }).addCase(fetchChronic_Absenteeism_Toptile.pending, (state, action) => {
            state.Chronic_Absenteeism_Toptileloading = true;
        })


        builder.addCase(fetchChronic_Absenteeism_Bar.fulfilled, (state, action) => {
            state.Chronic_Absenteeism_Bar = action.payload;
            state.Chronic_Absenteeism_Barloading = false;
        }).addCase(fetchChronic_Absenteeism_Bar.pending, (state, action) => {
            state.Chronic_Absenteeism_Barloading = true;
        })


        builder.addCase(fetchStudent_Belonging_Toptile.fulfilled, (state, action) => {
            state.Student_Belonging_Toptile = action.payload;
            state.Student_Belonging_Toptileloading = false;
        }).addCase(fetchStudent_Belonging_Toptile.pending, (state, action) => {
            state.Student_Belonging_Toptileloading = true;
        })


        builder.addCase(fetchStudent_Belonging_Bar.fulfilled, (state, action) => {
            state.Student_Belonging_Bar = action.payload;
            state.Student_Belonging_Barloading = false;
        }).addCase(fetchStudent_Belonging_Bar.pending, (state, action) => {
            state.Student_Belonging_Barloading = true;
        })


        builder.addCase(fetchOut_of_School_Suspensions_Toptile.fulfilled, (state, action) => {
            state.Out_of_School_Suspensions_Toptile = action.payload;
            state.Out_of_School_Suspensions_Toptileloading = false;
        }).addCase(fetchOut_of_School_Suspensions_Toptile.pending, (state, action) => {
            state.Out_of_School_Suspensions_Toptileloading = true;
        })


        builder.addCase(fetchOut_of_School_Suspensions_Bar.fulfilled, (state, action) => {
            state.Out_of_School_Suspensions_Bar = action.payload;
            state.Out_of_School_Suspensions_Barloading = false;
        }).addCase(fetchOut_of_School_Suspensions_Bar.pending, (state, action) => {
            state.Out_of_School_Suspensions_Barloading = true;
        })


        builder.addCase(fetchStaff_Engagement_Toptile.fulfilled, (state, action) => {
            state.Staff_Engagement_Toptile = action.payload;
            state.Staff_Engagement_Toptileloading = false;
        }).addCase(fetchStaff_Engagement_Toptile.pending, (state, action) => {
            state.Staff_Engagement_Toptileloading = true;
        })


        builder.addCase(fetchStaff_Engagement_Bar.fulfilled, (state, action) => {
            state.Staff_Engagement_Bar = action.payload;
            state.Staff_Engagement_Barloading = false;
        }).addCase(fetchStaff_Engagement_Bar.pending, (state, action) => {
            state.Staff_Engagement_Barloading = true;
        })


        builder.addCase(fetchStaff_DIversity_Toptile.fulfilled, (state, action) => {
            state.Staff_DIversity_Toptile = action.payload;
            state.Staff_DIversity_Toptileloading = false;
        }).addCase(fetchStaff_DIversity_Toptile.pending, (state, action) => {
            state.Staff_DIversity_Toptileloading = true;
        })


        builder.addCase(fetchStaff_DIversity_Bar.fulfilled, (state, action) => {
            state.Staff_DIversity_Bar = action.payload;
            state.Staff_DIversity_Barloading = false;
        }).addCase(fetchStaff_DIversity_Bar.pending, (state, action) => {
            state.Staff_DIversity_Barloading = true;
        })


        builder.addCase(fetchStaff_Retention_Toptile.fulfilled, (state, action) => {
            state.Staff_Retention_Toptile = action.payload;
            state.Staff_Retention_Toptileloading = false;
        }).addCase(fetchStaff_Retention_Toptile.pending, (state, action) => {
            state.Staff_Retention_Toptileloading = true;
        })


        builder.addCase(fetchStaff_Retention_Bar.fulfilled, (state, action) => {
            state.Staff_Retention_Bar = action.payload;
            state.Staff_Retention_Barloading = false;
        }).addCase(fetchStaff_Retention_Bar.pending, (state, action) => {
            state.Staff_Retention_Barloading = true;
        })


        builder.addCase(fetchFund_Balance_Toptile.fulfilled, (state, action) => {
            state.Fund_Balance_Toptile = action.payload;
            state.Fund_Balance_Toptileloading = false;
        }).addCase(fetchFund_Balance_Toptile.pending, (state, action) => {
            state.Fund_Balance_Toptileloading = true;
        })


        builder.addCase(fetchFund_Balance_Bar.fulfilled, (state, action) => {
            state.Fund_Balance_Bar = action.payload;
            state.Fund_Balance_Barloading = false;
        }).addCase(fetchFund_Balance_Bar.pending, (state, action) => {
            state.Fund_Balance_Barloading = true;
        })

        builder.addCase(fetchState_Assessment_Mathematics_Toptile.fulfilled, (state, action) => {
            state.State_Assessment_Mathematics_Toptile = action.payload;
            state.State_Assessment_Mathematics_Toptileloading = false;
        }).addCase(fetchState_Assessment_Mathematics_Toptile.pending, (state, action) => {
            state.State_Assessment_Mathematics_Toptileloading = true;
        })

        builder.addCase(fetchState_Assessment_Mathematics_Bar.fulfilled, (state, action) => {
            state.State_Assessment_Mathematics_Bar = action.payload;
            state.State_Assessment_Mathematics_Barloading = false;
        }).addCase(fetchState_Assessment_Mathematics_Bar.pending, (state, action) => {
            state.State_Assessment_Mathematics_Barloading = true;
        })

        builder.addCase(fetchFooter_Query.fulfilled, (state, action) => {
            state.Footer_Query = action.payload;
            state.Footer_Queryloading = false;
        }).addCase(fetchFooter_Query.pending, (state, action) => {
            state.Footer_Queryloading = true;
        })
    }
})


export default Home.reducer