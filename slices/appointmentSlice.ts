import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Appointment } from "@/types/modelsType";
import { getAppointmentsForClient } from "@/actions/appointmentAction";

export const fetchAppointmentsForClient = createAsyncThunk(
    'appointments/fetchAll',
    async () => {
      const response = await getAppointmentsForClient();
      if (response.res) {
        return response.appointments;
      }
      return [];
    }
  );


const initialState: {appointments: Appointment[], archivedAppointments: Appointment[], allAppoitment: Appointment[]} = {
    appointments: [],
    archivedAppointments: [],
    allAppoitment: []
}

interface validationData {
    date: string;
    message: string;
}

const appointmentSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        setAppointment: (state, action: PayloadAction<Appointment[] | []>) => {
            
            deleteAppointment()
            let s:Appointment[] = []
            let a:Appointment[] = []
            state.allAppoitment = action.payload
            if(action.payload.length != 0){
                action.payload.map((elem) => {
                    if(elem.isArchived){
                        a.push(elem)
                        state.archivedAppointments.push(elem)
                    } 
                    else {
                        s.push(elem)
                        console.log("Inside of the slice appointment setter ***********")
                        state.appointments.push(elem)
                    }
                })
                state.archivedAppointments = a
                state.appointments = s
            } else {
                deleteAppointment()
            }
        },

        setSimpleAppointment: (state, action: PayloadAction<Appointment[]>) => {
            state.appointments = action.payload
        },

        setArchivedAppointment: (state, action: PayloadAction<Appointment[]>) => {
            state.archivedAppointments = action.payload
        },

        updateAppointment: (state, action: PayloadAction<{index:number; data:Appointment}>) => {
            state.allAppoitment[action.payload.index] = action.payload.data
        },

        validateAppointmentData: (state, action:PayloadAction<{index: number, data:validationData}>) => {
            state.allAppoitment[action.payload.index].date = action.payload.data.date
            state.allAppoitment[action.payload.index].message = action.payload.data.message
            state.allAppoitment[action.payload.index].isConfirmed = true
        },
        cancelAppointmentData: (state, action:PayloadAction<number>) => {
            state.allAppoitment[action.payload].isValid = false
        },
        archiveAppointmentData: (state, action:PayloadAction<{index: number}>) => {
            state.allAppoitment[action.payload.index].isArchived = true
            setAppointment(state.allAppoitment)
        },

        deleteAppointment: (state) => {
            state.allAppoitment = []
            state.appointments = []
            state.archivedAppointments = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAppointmentsForClient.fulfilled, (state, action:PayloadAction<Appointment[] | []>) => {
            state.appointments = action.payload
        }) 
    },
})

export const { 
    setAppointment, updateAppointment, deleteAppointment,
    validateAppointmentData, cancelAppointmentData, archiveAppointmentData
 } = appointmentSlice.actions

export default appointmentSlice.reducer