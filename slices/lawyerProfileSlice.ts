// lawyerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lawyer, Domain } from '@/types/modelsType';

const initialState: { lawyerProfile: Lawyer | null; } = {
  lawyerProfile: null,
};

const lawyerSlice = createSlice({
  name: 'lawyerProfile',
  initialState,
  reducers: {
		setLawyer: (state, action: PayloadAction<Lawyer>) => {
			state.lawyerProfile = action.payload;
		},
		updateAvailability: (state, action: PayloadAction<object>) =>{
			if (state.lawyerProfile){
				state.lawyerProfile.availability = JSON.stringify(action.payload)
			}
		},
		deleteLawyerDataAfterLogout: (state) => {
			state.lawyerProfile = null
		}
	},
});

export const { setLawyer, updateAvailability } = lawyerSlice.actions;

export default lawyerSlice.reducer;