import React from "react";
import { View, Text } from "react-native";
import CustomButtonWithIcon from "./ButtonComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores/store";
import { archiveAppointment } from "@/actions/appointmentAction";
import { archiveAppointmentData } from "@/slices/appointmentSlice";
import { Toast } from "@ant-design/react-native";

interface validationProps {
    conclusion: () => void;
    index: number
}

const ValidationModalContent: React.FC<validationProps> = ({conclusion, index}) => {

    
    const dispatch = useDispatch<AppDispatch>()
    const appointmentData = useSelector((state:RootState) => state.appointments.allAppoitment[index])

    const [loading,setLoading] = useState(false)


    const handleArchive = async () => {
        setLoading(true)

        const response = await archiveAppointment(appointmentData.id)
        if(response){
            dispatch(archiveAppointmentData({index:index}))
            setLoading(false)
            Toast.success("This appoinitment is successfully archived !", 2)
            conclusion()
        } else {
            Toast.fail("An error ocured while performing the action. Please verify your network.")
        }
        setLoading(false)
    }

    return (
        <View>
            <Text style={{
                fontFamily: "dm-sans",
                padding: 10,
                textTransform: "uppercase",
            }}>
                Are you sure to archive this appointment ? There is no turning back after performing this action.
            </Text>
            <View style={{
                marginBottom: 15
            }}>
                <CustomButtonWithIcon 
                type="warning"
                text="Archive it"
                loading={loading}
                buttonClicked={handleArchive}
                />
            </View>
        </View>
    )
}

export default ValidationModalContent