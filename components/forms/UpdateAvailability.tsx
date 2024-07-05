import React from "react";
import { View, Text } from "react-native";
import { AvailabilityFormat } from "@/types/modelsType";
import CustomButtonWithIcon from "../ButtonComponent";
import { styles } from "@/styles/mainstyle";
import { Modal } from "@ant-design/react-native";
import { useState } from "react";
import AvailabilityUpdateContent from "../AvailabilityUpdateModalContent";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/stores/store";
import { update_availability } from "@/actions/LawyerAction";
import { updateAvailabilities } from "@/slices/availabilitySlice";



interface AvailabilityData {
    callback: (data: boolean) => void;
}

const UpdateAvailability:React.FC<AvailabilityData> = ({callback}) => {
    const dispatch: AppDispatch = useDispatch()
    const timeHeader = useSelector((state:RootState) => state.availability.header)
    const availabilityData = useSelector((state:RootState) => state.availability.availabilities)
    const [loading, setLoading] = useState(false)
    const [monday, setmonday] = useState(false)
    const [tuesday, settuesday] = useState(false)
    const [wednesday, setwednesday] = useState(false)
    const [thursday, setthursday] = useState(false)
    const [friday, setfriday] = useState(false)

    const [mondayData, setMondayData] = useState<AvailabilityFormat>(availabilityData[0])
    const [tuesdayData, setTuesdayData] = useState<AvailabilityFormat>(availabilityData[1])
    const [wednesdayData, setWednesdayData] = useState<AvailabilityFormat>(availabilityData[2])
    const [thursdayData, setThursdayData] = useState<AvailabilityFormat>(availabilityData[3])
    const [fridayData, setFridayData] = useState<AvailabilityFormat>(availabilityData[4])


    const handleAvailabilityValidate = async () => {
        setLoading(true)
        let all = [
            [...mondayData],
            [...tuesdayData],
            [...wednesdayData],
            [...thursdayData],
            [...fridayData]
        ]
        const body = JSON.stringify(all)

        const response = await update_availability({availability: body})
        if(response.res){
            console.log(response.availability)
            let storedData = JSON.parse(response.availability)
            dispatch(updateAvailabilities(storedData))
            callback(true)
            setLoading(false)
        } else {
            setLoading(false)
            callback(false)
        }
        setLoading(false)
    }


    return (
        <>
            <View>
                {/* Modal update */}
                <View>
                    <Modal 
                    style={{
                        width: "75%",
                        position: "absolute",
                        top: 140,
                        left: "12%",
                        borderRadius: 6,
                        backgroundColor: "white",
                        padding: 15
                    }}
                    visible={monday}
                    >

                        <AvailabilityUpdateContent 
                        index={0}
                        parentValue={mondayData}
                        setParentvalue={setMondayData}
                        />

                        <CustomButtonWithIcon 
                        type="warning"
                        text="Close the modal"
                        buttonClicked={() => setmonday(false)}
                        />

                    </Modal>
                </View>

                <View>
                    <Modal 
                    style={{
                        width: "75%",
                        position: "absolute",
                        top: 140,
                        left: "12%",
                        borderRadius: 6,
                        backgroundColor: "white",
                        padding: 15
                    }}
                    visible={tuesday}
                    >

                        <AvailabilityUpdateContent 
                        index={1}
                        parentValue={tuesdayData}
                        setParentvalue={setTuesdayData}
                        />

                        <CustomButtonWithIcon 
                        type="warning"
                        text="Close the modal"
                        buttonClicked={() => settuesday(false)}
                        />

                    </Modal>
                </View>

                <View>
                    <Modal 
                    style={{
                        width: "75%",
                        position: "absolute",
                        top: 140,
                        left: "12%",
                        borderRadius: 6,
                        backgroundColor: "white",
                        padding: 15
                    }}
                    visible={wednesday}
                    >

                        <AvailabilityUpdateContent 
                        index={2}
                        parentValue={wednesdayData}
                        setParentvalue={setWednesdayData}
                        />

                        <CustomButtonWithIcon 
                        type="warning"
                        text="Close the modal"
                        buttonClicked={() => setwednesday(false)}
                        />

                    </Modal>
                </View>

                <View>
                    <Modal 
                    style={{
                        width: "75%",
                        position: "absolute",
                        top: 140,
                        left: "12%",
                        borderRadius: 6,
                        backgroundColor: "white",
                        padding: 15
                    }}
                    visible={thursday}
                    >

                        <AvailabilityUpdateContent 
                        index={3}
                        parentValue={thursdayData}
                        setParentvalue={setThursdayData}
                        />

                        <CustomButtonWithIcon 
                        type="warning"
                        text="Close the modal"
                        buttonClicked={() => setthursday(false)}
                        />

                    </Modal>
                </View>

                <View>
                    <Modal 
                    style={{
                        width: "75%",
                        position: "absolute",
                        top: 140,
                        left: "12%",
                        borderRadius: 6,
                        backgroundColor: "white",
                        padding: 15
                    }}
                    visible={friday}
                    >

                        <AvailabilityUpdateContent 
                        index={4}
                        parentValue={fridayData}
                        setParentvalue={setFridayData}
                        />

                        <CustomButtonWithIcon 
                        type="warning"
                        text="Close the modal"
                        buttonClicked={() => setfriday(false)}
                        />

                    </Modal>
                </View>



                {/* ****************** */}

                <View>
                    <Text style={[styles.color_green, {
                        fontSize: 20,
                        textAlign:"center",
                        paddingBottom: 10,
                        fontWeight: "700"
                    }]}>
                            Update weekly planning
                    </Text>
                </View>

                <View style={[styles.form_ask, {
                    paddingBottom: 5,
                }]}>
                    <CustomButtonWithIcon 
                    type="outlined"
                    text="Update Monday"
                    buttonClicked={() => setmonday(true)}
                    
                    />
                </View>

                <View style={[styles.form_ask, {
                    paddingBottom: 5,
                }]}>
                    <CustomButtonWithIcon 
                    type="outlined"
                    text="Update Tuesday"
                    buttonClicked={() => settuesday(true)}
                    />
                </View>

                <View style={[styles.form_ask, {
                    paddingBottom: 5,
                }]}>
                    <CustomButtonWithIcon 
                    type="outlined"
                    text="Update Wednesday"
                    buttonClicked={() => setwednesday(true)}
                    />
                </View>

                <View style={[styles.form_ask, {
                    paddingBottom: 5,
                }]}>
                    <CustomButtonWithIcon 
                    type="outlined"
                    text="Update Thursday"
                    buttonClicked={() => setthursday(true)}
                    />
                </View>

                <View style={[styles.form_ask, {
                    paddingBottom: 15,
                }]}>
                    <CustomButtonWithIcon 
                    type="outlined"
                    text="Update Friday"
                    buttonClicked={() => setfriday(true)}
                    />
                </View>


                <View style={{marginBottom: 10}}>
                    <CustomButtonWithIcon
                    type="primary"
                    text="Validate"
                    loading={loading}
                    buttonClicked={handleAvailabilityValidate}
                    />
                </View>

            </View>
        </>
    )
}


export default UpdateAvailability