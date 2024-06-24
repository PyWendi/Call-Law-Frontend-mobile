import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Domain } from "@/types/modelsType";

const initialState: {domains: Domain[] | []} = {
    domains: []
}

const domainSlice = createSlice({
    name: "domains",
    initialState,
    reducers: {
        setDomain: (state, action: PayloadAction<Domain[]>) => {
            state.domains = action.payload
        }
    }
})


export const { setDomain } = domainSlice.actions

export default domainSlice.reducer