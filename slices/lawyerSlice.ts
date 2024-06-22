// // lawyerSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Lawyer, LawyerActions, FetchLawyersAction } from '';

// const initialState: { lawyers: Lawyer[]; status: 'idle' | 'loading' | 'success' | 'failure'; error: null } = {
//   lawyers: [],
//   status: 'idle',
//   error: null,
// };

// const lawyerSlice = createSlice({
//   name: 'lawyers',
//   initialState,
//   reducers: {
//     addLawyer: (state, action: PayloadAction<Lawyer>) => {
//       state.lawyers.push(action.payload);
//     },
//     updateLawyer: (state, action: PayloadAction<Partial<Lawyer>>) => {
//       const existingLawyerIndex = state.lawyers.findIndex((lawyer) => lawyer.id === action.payload.id);
//       if (existingLawyerIndex!== -1) {
//         state.lawyers[existingLawyerIndex] = {...state.lawyers[existingLawyerIndex],...action.payload };
//       }
//     },
//     deleteLawyer: (state, action: PayloadAction<string>) => {
//       state.lawyers = state.lawyers.filter((lawyer) => lawyer.id!== action.payload);
//     },
//     fetchLawyers: (state, action: PayloadAction<Lawyer[]>) => {
//       state.lawyers = action.payload;
//       state.status = 'success';
//     },
//   },
// });

// export const { addLawyer, updateLawyer, deleteLawyer, fetchLawyers } = lawyerSlice.actions;

// export default lawyerSlice.reducer;