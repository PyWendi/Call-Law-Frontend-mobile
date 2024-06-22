


// // lawyerSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   lawyers: [],
//   status: 'idle',
//   error: null,
// };

// const lawyerSlice = createSlice({
//   name: 'lawyers',
//   initialState,
//   reducers: {
//     lawyersRequested: (state) => {
//       state.status = 'pending';
//     },
//     lawyersReceived: (state, action) => {
//       state.status = 'succeeded';
//       state.lawyers = action.payload;
//     },
//     lawyersRequestFailed: (state, action) => {
//       state.status = 'failed';
//       state.error = action.payload;
//     },
//     lawyerAdded: (state, action) => {
//       state.lawyers.push(action.payload);
//     },
//     lawyerUpdated: (state, action) => {
//       const index = state.lawyers.findIndex((lawyer) => lawyer.id === action.payload.id);
//       if (index!== -1) {
//         state.lawyers[index] = action.payload;
//       }
//     },
//     lawyerDeleted: (state, action) => {
//       state.lawyers = state.lawyers.filter((lawyer) => lawyer.id!== action.payload);
//     },
//   },
// });

// export const {
//   lawyersRequested,
//   lawyersReceived,
//   lawyersRequestFailed,
//   lawyerAdded,
//   lawyerUpdated,
//   lawyerDeleted,
// } = lawyerSlice.actions;

// export default lawyerSlice.reducer;



// // store.js
// import { configureStore } from '@reduxjs/toolkit';
// import lawyerReducer from './lawyerSlice';

// export const store = configureStore({
//   reducer: {
//     lawyers: lawyerReducer,
//   },
// });



// // App.js
// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './store';
// import AppContent from './AppContent'; // Your main app content component

// function App() {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// }

// export default App;


// // LawyerList.js
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { lawyersRequested, lawyerAdded, lawyerUpdated, lawyerDeleted } from './lawyerSlice';

// const LawyerList = () => {
//   const dispatch = useDispatch();
//   const lawyers = useSelector((state) => state.lawyers.lawyers);
//   const lawyerStatus = useSelector((state) => state.lawyers.status);
//   const lawyerError = useSelector((state) => state.lawyers.error);

//   useEffect(() => {
//     if (lawyerStatus === 'idle') {
//       dispatch(lawyersRequested());
//       // Fetch lawyers from your API here
//       // On success, dispatch(lawyersReceived(paidLawyers))
//       // On failure, dispatch(lawyersRequestFailed(error))
//     }
//   }, [lawyerStatus, dispatch]);

//   const handleAddLawyer = (newLawyer) => {
//     dispatch(lawyerAdded(newLawyer));
//     // Add logic to save the new lawyer to your backend
//   };

//   const handleUpdateLawyer = (updatedLawyer) => {
//     dispatch(lawyerUpdated(updatedLawyer));
//     // Update logic to save the updated lawyer to your backend
//   };

//   const handleDeleteLawyer = (lawyerId) => {
//     dispatch(lawyerDeleted(lawyerId));
//     // Delete logic to remove the lawyer from your backend
//   };

//   return (
//     <div>
//       {/* Render your list of lawyers */}
//       {/* Include buttons or forms to add, update, and delete lawyers */}
//     </div>
//   );
// };

// export default LawyerList;