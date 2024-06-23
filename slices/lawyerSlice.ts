// lawyerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lawyer } from '@/types/modelsType';

const initialState: { lawyers: Lawyer[]; } = {
  	lawyers: [],
};

const lawyerSlice = createSlice({
	name: 'lawyers',
	initialState,
	reducers: {
		setLawyer: (state, action:PayloadAction<Lawyer[]>) => {
			state.lawyers = action.payload
		}
	}	
});

export const { setLawyer } = lawyerSlice.actions;

export default lawyerSlice.reducer;