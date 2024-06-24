import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lawyer } from '@/types/modelsType';

const initialState: { lawyerProfile: Lawyer | null; } = {
  lawyerProfile: null,
};

const lawyerProfileSlice = createSlice({
  name: 'lawyerProfile',
  initialState,
  reducers: {
		setLawyerProfile: (state, action: PayloadAction<Lawyer>) => {
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

export const { setLawyerProfile, updateAvailability } = lawyerProfileSlice.actions;

export default lawyerProfileSlice.reducer;