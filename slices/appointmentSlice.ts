import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appointment } from "@/types/modelsType";

const initialState: {appointments: Appointment[]} = {
    appointments: []
}

const appointmentSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        setAppointment: (state, action: PayloadAction<Appointment[]>) => {
            state.appointments = action.payload
        },
        // Not done
        updateAppointment: (state, action: PayloadAction<{index:number; data:Appointment}>) => {
            state.appointments[action.payload.index] = action.payload.data
        },
        deleteAppointment: (state) => {
            state.appointments = []
        }
    }
})

export const { setAppointment, updateAppointment, deleteAppointment } = appointmentSlice.actions

export default appointmentSlice.reducer