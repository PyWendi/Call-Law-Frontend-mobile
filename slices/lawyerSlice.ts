// lawyerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MassLawyerFormat } from '@/types/modelsType';

const initialState: { lawyers: MassLawyerFormat[]; } = {
  	lawyers: [],
};

const lawyerSlice = createSlice({
	name: 'lawyers',
	initialState,
	reducers: {
		setLawyers: (state, action:PayloadAction<MassLawyerFormat[]>) => {
			state.lawyers = action.payload
		},
		deleteLawyers: (state) => {
			state.lawyers = []
		}
	}	
});

export const { setLawyers } = lawyerSlice.actions;

export default lawyerSlice.reducer;