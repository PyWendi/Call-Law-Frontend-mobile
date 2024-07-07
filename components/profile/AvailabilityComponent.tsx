import React, {useState, useEffect} from "react";
import { View, Text, Accordion, List, Modal, Toast } from "@ant-design/react-native";
import { ScrollView, StyleSheet } from "react-native";
import { update_availability } from "@/actions/LawyerAction";
import CustomButtonWithIcon from "../ButtonComponent";
import { decodedToken } from "@/stores/tokenManagement";
import { CustomJwtPayload } from "@/types/customTokenType";
import { get_availability } from "@/actions/LawyerAction";
import UpdateAvailability from "../forms/UpdateAvailability";
import { useRouter } from "expo-router";
import { AvailabilityHeader, LawyerAvailabilityUpdate } from "@/types/modelsType";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/stores/store";
import { setAvailabilities } from "@/slices/availabilitySlice";

interface VisitorProps {
    lawyer_id: number
    isVisitor: boolean;
}

const AvailabilityComponent:React.FC<VisitorProps> = ({isVisitor, lawyer_id}) => {
    const router  = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const [modal, setModal] = useState(false)
    const [active, setActive] = useState<number[]>([])
    const availability = useSelector((state:RootState) => state.availability.header)
    const data = useSelector((state:RootState) => state.availability.availabilities)

    const fetchAvailability = async () => {
        const response = await get_availability(lawyer_id)
        if(response.res){
            let data = JSON.parse(response.availability)
            dispatch(setAvailabilities(data))
        } else {
            console.log("An error occured when fetching the availabilities.")
        }
    }

    const triggerUpdate = async (updated: boolean) => {
        if(updated) {
            await Toast.success("Your weekly planning has been updated.")
            setModal(false) 
        } else {
            Toast.fail("An error occured when performing the operation")
        }
    }

    useEffect(() => {
        // console.log("FETCHING AVAILABILITY")
        fetchAvailability()
    }, [lawyer_id])

    return (
        <>
            <View>
                
                {/* Modal for update */}
                <View>
                    <Modal 
                    visible={modal}
                    style={{
                        width: "75%",
                        position: "absolute",
                        top: 250,
                        left: "12%",
                        borderRadius: 6,
                        backgroundColor: "white"
                    }}
                    >

                        <View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
                            
                            <UpdateAvailability 
                            callback={(data) => triggerUpdate(data)} />

                            <CustomButtonWithIcon 
                            loading={false}
                            text="Close modal"
                            type="outlined_danger"
                            buttonClicked={() => setModal(false)}
                            />
                        </View>


                    </Modal>
                </View>

                <ScrollView 
                style={{height: (350)}}>
                    <View>
                        <Accordion
                            activeSections={active}
                            onChange={(e: number[]) => setActive(e)}
                            style={{
                                overflow: "hidden",
                                width: "80%",
                            }}
                        >

                        {availability.days.map((elem: string, index:number) => (
                            <Accordion.Panel
                            key={index+''}
                                header={elem}>
                                <List style={styles.list} key={index}>
                                    {availability.times.map((time, i) => (
                                        <List.Item key={i}>
                                            <View style={styles.time_container}>
                                                <Text  style={[styles.time]}>
                                                    {time}
                                                </Text>
                                                <Text style={[
                                                    (data[index][i]) ? styles.time_valid : styles.time_invalid,
                                                    styles.time]}>
                                                        {(data[index][i]) ? "Available" : "Not available"}
                                                </Text>
                                            </View>
                                        </List.Item>
                                    ))}
                                </List>
                            </Accordion.Panel>
                        ))}
                        </Accordion>
                        
                        {(!isVisitor) && (
                            <View style={{width: "80%", marginTop: 10}}>
                                <CustomButtonWithIcon 
                                type="outlined"
                                text="Edit your availability"
                                buttonClicked={() => setModal(true)}
                                />
                            </View>
                        )}
                    
                    </View>
                </ScrollView>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    time_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    list:{
        overflow: 'hidden',
        width: "100%"
    },
    time:{
        fontFamily: "dm-sans",
        fontSize: 12,
    },
    time_valid:{
        color: "#108B54",
        textTransform: "uppercase"
    }, 
    time_invalid: {
        color:"#A03535",
        textTransform: "uppercase"
        
        
    }
})

export default AvailabilityComponent