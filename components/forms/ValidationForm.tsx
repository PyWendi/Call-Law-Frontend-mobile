import React from "react";
import { View, StyleSheet } from "react-native";
import { AppointmentLawyerValidationFormat } from "@/types/modelsType";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import CustomButtonWithIcon from "../ButtonComponent";
import CustomInputSimple from "../CustomWithoutLineComponent";
import { validateAppointment } from "@/actions/appointmentAction";
import { validateAppointmentData } from "@/slices/appointmentSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/stores/store";
import { Toast } from "@ant-design/react-native";


interface DataTransfer {
    dataTransfer: () => void;
    index: number
}

const ValidationForm: React.FC<DataTransfer> = ({dataTransfer, index}) => {
    
    const dispatch = useDispatch<AppDispatch>()
    const appointmentData = useSelector((state:RootState) => state.appointments.appointments[index])

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleValidate = async () => {
        setLoading(true)
        const data = {
            message: message,
            date: date.toISOString()
        }

        const response = await validateAppointment(appointmentData.id, data)
        if(response.res){
            dispatch(validateAppointmentData({
                index: index,
                data: {
                    date: date.toISOString(),
                    message: message
                }
            }))
            Toast.success("This appoinitment is successfully canceled !", 2)
            setLoading(false)
            dataTransfer()
        } else {
            Toast.fail("An error ocured while performing the action. Please verify your network.")
        }
        setLoading(false)
    }


    return (
        <View>
            {/* Datetime picker */}
            <View style={style.form_container}>
                <View style={{
                        marginBottom: 20,
                        width: "90%",
                        margin: "auto"
                    }}>
                    <CustomButtonWithIcon 
                    type="outlined"
                    buttonClicked={() => setShow(true)}
                    icon="clock-o"
                    text="Select the datetime"
                    />
                    <DatePicker
                        modal
                        open={show}
                        date={date}
                        onConfirm={(date) => {
                            setShow(false)
                            setDate(date)
                            console.log(date)
                        }}
                        onCancel={() => {
                            setShow(false)
                        }}
                    />
                </View>

                <View style={{
                    marginTop: 10,
                    marginBottom: 30
                }}>
                    <CustomInputSimple 
                    parentValue={message}
                    setParenValue={setMessage}
                    type="text"
                    placeholder="Type something..."
                    label="Leave a little message.(optional)"
                    />
                </View>

                <View>
                    <CustomButtonWithIcon  
                    type="primary"
                    icon="check"
                    loading={loading}
                    text="Validate the appointment"  
                    buttonClicked={handleValidate}               
                    />
                </View>

            </View>
        </View>
    )
}

const style = StyleSheet.create({
    form_container: {
        marginBottom: 20 
    }
})

export default ValidationForm