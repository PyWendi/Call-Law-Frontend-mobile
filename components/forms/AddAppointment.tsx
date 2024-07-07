import React, {useState, useEffect} from "react";
import { View, Text } from "react-native";
import { Picker, Toast } from "@ant-design/react-native";
import CustomInputSimple from "../CustomWithoutLineComponent";
import CustomButtonWithIcon from "../ButtonComponent";
import { fetchSpeciality } from "@/actions/specialityAction";
import { PickerValue, PickerValueExtend } from "@ant-design/react-native";
import { AppointmentCreateFormat } from "@/types/modelsType";
import { styles } from "@/styles/mainstyle";
import { createAppointment } from "@/actions/appointmentAction";

interface PropsData {
    lawyer_id: number;
    callback: () => void;
}

interface SelectFormat {
    label: string;
    value: any;
}

const AddAppointment: React.FC<PropsData> = ({callback, lawyer_id}) => {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    
    const [speciality, setSpeciality] = useState<any>()
    const [specialityDesign, setSpecialityDesign] = useState("")
    const [specialityData, setSpecialityData] = useState<SelectFormat[] | []>([])

    
    const specialityMap = specialityData.reduce((acc:any, curr:any) => {
        acc[curr.value] = curr.label;
        return acc;
    }, {});
    
    const handleSpecialityChange = (value:any) => {
        const label = specialityMap[value]
        if (label){
            setSpecialityDesign(label)
        }
    }


    async function getSpecialityData () {
        const response = await fetchSpeciality()
        if (response.res) {
            console.log(response.specialities)
            let data: SelectFormat[] = []
            response.specialities.map((elem) => [
                data.push({
                    label: elem.name,
                    value: elem.id
                })
            ])
            console.log(data)
            setSpeciality(data[0].value)
            setSpecialityDesign(data[0].label)
            setSpecialityData(data)
        }
    }



    const validate = async () => {
        setLoading(true)
        const data:AppointmentCreateFormat = {
            title: title,
            description: description,
            lawyer: lawyer_id,
            speciality: speciality
        }
        const response = await createAppointment(data)
        if(response.res) {
            await Toast.success("Your appointment request has been sent successfully", 2)
            callback()
        } else {
            Toast.fail("An error occured when requesting an appointment, please check your network and try again later...", 3)
        }
        setLoading(false)
    }


    useEffect(() => {
        getSpecialityData()
    }, [])

    return (
        <>
            <View>

                <View>
                    <Text style={[styles.color_green, {
                        fontSize: 20,
                        textAlign:"center",
                        paddingBottom: 10,
                        fontWeight: "700"
                    }]}>
                            Take an appointment
                    </Text>
                </View>

                {/* Title and description */}
                <View style={[styles.form_ask, {
                    paddingBottom: 5,
                }]}>
                    <View style={[styles.centered_elem, {width: "100%"}]}>
                        <CustomInputSimple
                        label="Title" 
                        parentValue={title}
                        setParenValue={setTitle}
                        type="text"
                        placeholder=""
                        />
                    </View>

                    <View style={[styles.centered_elem, {width: "100%"}]}>
                        <CustomInputSimple 
                        label="Description" 
                        parentValue={description}
                        setParenValue={setDescription}
                        type={"text"}
                        placeholder=""
                        />
                    </View>

                </View>


                {/* Select domain */}
                <View style={[styles.form_ask, {marginBottom: 10}]}>

                    <Picker
                    style={{marginBottom:10}}
                    locale={
                        {okText: "Validate",
                            dismissText: "Dismiss"
                        }
                    }
                    data={specialityData}
                    cols={3}
                    onChange={(n) => {
                        setSpeciality(n[0])
                        handleSpecialityChange(n[0])
                        console.log(n)
                    }}
                    onClose={() => {
                        setVisible(false)
                    }}
                    visible={visible}
                    value={speciality}
                    onOk={(v: PickerValue[], ext: PickerValueExtend) => {
                        console.log(v)
                        setSpeciality(v)
                    }}>
                            <View style={{ padding: 5, width: "95%", margin:'auto' }}>
                            <CustomButtonWithIcon 
                            text={"Selected domain: "+ specialityDesign}
                            type="outlined"
                            buttonClicked={() => setVisible(true)}
                            />
                        </View>
                    </Picker>
                </View>


                <View style={{marginBottom: 10}}>
                    <CustomButtonWithIcon
                    type="primary"
                    loading={loading}
                    text="Validate"
                    buttonClicked={validate}
                    />
                </View>
            </View>
        </>
    )
}


export default AddAppointment