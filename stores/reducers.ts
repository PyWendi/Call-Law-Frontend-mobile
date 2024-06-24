import { combineReducers } from "redux";
import regionSlice from "@/slices/regionSlice";
import lawyerSlice from "@/slices/lawyerSlice";
import lawyerProfileSlice from "@/slices/lawyerProfileSlice";
import clientProfileSlice from "@/slices/clientProfileSlice";
import domainSlice from "@/slices/domainSlice";
import notificationSlice from "@/slices/notificationSlice";
import appointmentSlice from "@/slices/appointmentSlice";
import specialitySlice from "@/slices/specialitySlice";
import avisslice from "@/slices/avisslice";
import experienceSlice from "@/slices/experienceSlice";


export default combineReducers({
    lawyerProfile: lawyerProfileSlice,
    clientProfile: clientProfileSlice,
    regions: regionSlice,
    lawyers: lawyerSlice,
    domains: domainSlice,
    notifications: notificationSlice,
    appointments: appointmentSlice,
    specialities: specialitySlice,
    avis: avisslice,
    experiences: experienceSlice,
})
