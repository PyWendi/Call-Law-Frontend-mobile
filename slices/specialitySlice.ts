import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Speciality } from "@/types/modelsType";

const initialState: {specialities: Speciality[]} = {
    specialities: []
}


const specialitySlice = createSlice({
    name: "specialities",
    initialState,
    reducers: {
        setSpecialities: (state, action: PayloadAction<Speciality[]>) => {
            state.specialities = action.payload
        },
        deleteSpecialities: (state) => {
            state.specialities = []
        }
    }
})


export const { setSpecialities, deleteSpecialities } = specialitySlice.actions

export default specialitySlice.reducer