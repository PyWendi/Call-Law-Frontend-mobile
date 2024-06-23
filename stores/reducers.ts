import { combineReducers } from "redux";
import regionSlice from "@/slices/regionSlice";
import lawyerSlice from "@/slices/lawyerSlice";

export default combineReducers({
    regions: regionSlice,
    lawyers: lawyerSlice
})