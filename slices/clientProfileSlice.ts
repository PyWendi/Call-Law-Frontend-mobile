import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "@/types/modelsType";

const initialState: {clientProfile: Client | null} = {
    clientProfile: null,
}


const clientProfileSlice = createSlice({
    name: "clientProfile",
    initialState,
    reducers: {
        setClientProfile: (state, action:PayloadAction<Client>) => {
            state.clientProfile = action.payload
        },
        deleteClientProfileAfterLogout: (state) => {
            state.clientProfile = null
        }
    }
})  


export const { setClientProfile, deleteClientProfileAfterLogout } = clientProfileSlice.actions

export default clientProfileSlice.reducer;