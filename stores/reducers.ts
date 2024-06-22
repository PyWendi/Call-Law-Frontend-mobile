import { combineReducers } from "redux";
import regionSlice from "@/slices/regionSlice";

export default combineReducers({
    regions: regionSlice,
})