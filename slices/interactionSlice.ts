import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    isLoading: boolean;
    requestLoading: boolean;
    formLoading: boolean;
} = {
    formLoading: false,
    isLoading: false,
    requestLoading: false,
}


const interactionSlice = createSlice({
    name: "interactions",
    initialState,
    reducers: {
        setIsLoading: (state) => {
            state.isLoading = true
        },
        stopIsLoading: (state) => {
            state.isLoading = false
        },

        setRequestLoading: (state) => {
            state.requestLoading = true
        },
        stopRequestLoading: (state) => {
            state.requestLoading = false
        },

        setFormLoading: (state) => {
            state.formLoading = true
        },
        stopFormLoading: (state) => {
            state.formLoading = false
        },
    }
})


export const { 
    setFormLoading, setIsLoading, setRequestLoading,
    stopFormLoading, stopRequestLoading, stopIsLoading
} = interactionSlice.actions

export default interactionSlice.reducer
