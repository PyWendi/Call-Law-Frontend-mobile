import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Avis } from "@/types/modelsType";

const initialState: {avis: Avis[]} = {
    avis: []
}


const avisSlice = createSlice({
    name: "avis",
    initialState,
    reducers: {
        setAvis: (state, action: PayloadAction<Avis[]>) => {
            state.avis = action.payload
        },
        deleteAvis: (state) => {
            state.avis = []
        }
    }
})

export const { setAvis, deleteAvis } = avisSlice.actions

export default avisSlice.reducer
