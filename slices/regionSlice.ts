import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Region } from "@/types/modelsType";

const initialState: {regions: Region[]} = {
    regions: []
}

const regionSlice = createSlice({
    name: 'regions',
    initialState,
    reducers: {
        setRegion: (state, action: PayloadAction<Region[]>) => {
            state.regions = action.payload
        },

        addRegion: (state, action: PayloadAction<Region>) => {
            state.regions.push(action.payload)
        }
    }
})


export const { setRegion, addRegion } = regionSlice.actions

export default regionSlice.reducer