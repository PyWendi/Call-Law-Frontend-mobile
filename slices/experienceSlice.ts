import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience } from "@/types/modelsType";

const initialState:{experiences: Experience[]} = {
    experiences: []
}

const experienceSlice = createSlice({
    name: "experiences",
    initialState,
    reducers: {
        setExperiences: (state, action: PayloadAction<Experience[]>) => {
            state.experiences = action.payload
        },
        updateExperience: (state, action: PayloadAction<{index:number; data: Experience}>) => {
            state.experiences[action.payload.index] = action.payload.data
        },
        deleteAnExperience: (state, action: PayloadAction<number>) => {
            state.experiences[action.payload] // Need to be updated | Delete a specific experience
        },
        deletExperiences: (state) => {
            state.experiences = []
        }
    }
})

export const { setExperiences, updateExperience, deletExperiences, deleteAnExperience } = experienceSlice.actions

export default experienceSlice.reducer
