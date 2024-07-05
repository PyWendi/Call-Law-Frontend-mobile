import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LawyerAvailabilityUpdate, AvailabilityHeader } from "@/types/modelsType";

const initialState: {availabilities: LawyerAvailabilityUpdate, header: AvailabilityHeader} = {
    header: {
        days: ["Monday", "Tuesday", "Wendesday", "Thursday", "Friday"],
        times: ['7-8 AM', '8-9 AM', '9-10 AM', '10-11 AM', '11-12 AM', "1-2 PM", "2-3 PM", "3-4 PM", "4-5 PM", "5-6 PM"]
    },
    availabilities: [
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false]
    ]
}

const availabilitySlice = createSlice({
    name: "availabilities",
    initialState,
    reducers: {
        setAvailabilities: (state, action: PayloadAction<LawyerAvailabilityUpdate>) => {
            state.availabilities = action.payload
        },
        updateAvailabilities: (state, action: PayloadAction<LawyerAvailabilityUpdate>) => {
            state.availabilities = action.payload
        }
    }
})


export const {setAvailabilities, updateAvailabilities} = availabilitySlice.actions

export default availabilitySlice.reducer