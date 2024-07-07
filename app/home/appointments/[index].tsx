import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "@/stores/store"
import { styles } from "@/styles/mainstyle"
import HeaderSectionComponent from "@/components/HeaderSectionComponent"
import { FontAwesome } from "@expo/vector-icons"
import { parseISO, format, formatDistanceToNow } from "date-fns"
import TagComponent from "@/components/TagComponent"
import ProfileImage from "@/components/ListProfileImage"
import { useState, useEffect } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { CustomJwtPayload } from "@/types/customTokenType"
import { decodedToken } from "@/stores/tokenManagement"
import CustomButtonWithIcon from "@/components/ButtonComponent"
import { cancelAppointment } from "@/actions/appointmentAction"
import { cancelAppointmentData } from "@/slices/appointmentSlice"
import { Toast, Modal } from "@ant-design/react-native"
import { AppointmentLawyerValidationFormat } from "@/types/modelsType"
import ValidationForm from "@/components/forms/ValidationForm"
import ValidationModalContent from "@/components/ValidationModalContent"


export default function AppointmentDetails() {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const [userIsClient, setUserIsClient] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [validationModal, setValidationModal] = useState(false)
    
    
    
    let { index, archive } = useLocalSearchParams();
    const safeIndex = typeof index === 'string'? index : '0';
    const parsedIndex = parseInt(safeIndex);
    const detailData = (archive==="false") ? useSelector((state:RootState) => state.appointments.appointments[parsedIndex]) : useSelector((state:RootState) => state.appointments.archivedAppointments[parsedIndex])
    const formatedDate = detailData.date ? format(parseISO(detailData.date), 'dd/MM/yyyy HH:mm') : "-- / -- / --"
    const formatCreatedDate = formatDistanceToNow(parseISO(detailData.created_at))

    async function defineUserIsClient (): Promise<boolean> {
        const tokenData:CustomJwtPayload | null = await decodedToken()
        if(tokenData){
            return (tokenData.isClient) ? true : false
        }else {
            router.navigate("/")
            return false
        }
    }

    async function setuser() {
        setUserIsClient(await defineUserIsClient())
    }

    async function handleForm() {   
        setModal(false)
    }

    async function validateArchive() {
        console.log("fetching...")
        setValidationModal(false)
    }

    const handleCancel = async () => {
        setLoading(true)
        const response = await cancelAppointment(detailData.id)
        if(response){
            dispatch(cancelAppointmentData(parsedIndex))
            Toast.success("This appoinitment is successfully canceled !")
        } else {
            Toast.fail("An error ocured while performing the action. Please verify your network.")
        }
        setLoading(false)
    }

    useEffect(() => {
        console.log(detailData)
        setuser()
    }, [])
 

    return (
        <ScrollView>
            {/* Modal for confirmation */}
            <Modal
                style={{
                    width: "75%",
                    position: "absolute",
                    top: "25%",
                    left: "12%",
                    transform: [
                        { translateX: '50%' },
                        { translateY: '50%' }
                    ],
                    borderRadius: 6
                }}
                popup
                visible={modal}
                onClose={() => setModal(false)}>
                <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                    <View>
                        <Text style={[styles.color_green, {
                            fontSize: 20,
                            textAlign:"center",
                            paddingBottom: 10
                        }]}>
                            Choose the date of appointment
                        </Text>
                    </View>

                    <View>
                        <ValidationForm dataTransfer={handleForm} index={parsedIndex}/>
                    </View>

                    <CustomButtonWithIcon 
                    loading={false}
                    text="Close validation"
                    type="outlined_danger"
                    buttonClicked={() => setModal(false)}
                    />
                </View>
            </Modal>


            <Modal
                style={{
                    width: "75%",
                    position: "absolute",
                    top: "25%",
                    left: "12%",
                    transform: [
                        { translateX: '50%' },
                        { translateY: '50%' }
                    ],
                    borderRadius: 6
                }}
                popup
                visible={validationModal}
                onClose={() => setValidationModal(false)}>
                <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                    <View>
                        <Text style={[styles.color_green, {
                            fontSize: 20,
                            textAlign:"center",
                            paddingBottom: 10
                        }]}>
                            Archive statement
                        </Text>
                    </View>

                    <View>
                        <ValidationModalContent conclusion={validateArchive} index={parsedIndex} />
                    </View>

                    <CustomButtonWithIcon 
                    loading={false}
                    text="Close validation"
                    type="outlined_danger"
                    buttonClicked={() => setValidationModal(false)}
                    />
                </View>
            </Modal>



            <View style={style.container}>
            
            {/* Page titple */}
            <HeaderSectionComponent title="Appointment Detail"/>
            

            {/* Header: Title and description and case speciality */}
            <View style={[style.elem_container, {marginTop:15}]}>
                <View style={style.mb}>
                    <Text style={[style.text_section_highlight, styles.color_green]}>Title :</Text> 
                    <Text style={style.text_section_content}>{detailData.title}</Text>
                </View>

                <View style={style.mb}>
                    <Text style={[style.text_section_highlight, styles.color_green]}>Description :</Text> 
                    <Text style={style.text_section_content}>{detailData.description}</Text>
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    alignContent:"flex-start",
                    flexWrap: "wrap"
                }}>
                    <FontAwesome 
                    style={{width: "10%"}}
                     name="briefcase" size={23} color={"grey"} />
                    <Text style={[style.text_section_content, {width:"90%", textDecorationLine: "underline"}, styles.color_green]}>{detailData.speciality.name}</Text>
                </View>
            </View>


            {/* Date, created_at and status*/}
            <View style={[style.elem_container]}>
                <View style={style.mb}>
                    <Text style={[style.text_section_highlight, styles.color_green]}>Appointment date:</Text> 
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        alignContent:"flex-start",
                        flexWrap: "wrap",
                        marginBottom: 5
                    }}>
                        <FontAwesome 
                        style={{marginRight: 10, marginTop: 3}}
                        name="clock-o" size={25} color={"grey"} />
                        {/* <Text style={[style.text_section_content, styles.color_green]}>{detailData.title}</Text> */}
                        {(detailData.date != null) ? 
                        (
                            <Text style={[style.text_section_content, styles.color_green]}>{formatedDate}</Text>
                        ) : 
                        (
                            <Text style={[style.text_section_content, styles.color_green]}>Not mentionned...</Text>
                        )}
                    </View>
                    
                    <View style={style.mb}>
                        <Text style={[style.text_section_highlight, styles.color_green]}>Declared :</Text> 
                        <Text style={style.text_section_content}>{formatCreatedDate} ago</Text>
                    </View>

                    <View >
                        <Text style={[style.text_section_highlight, styles.color_green]}>Status :</Text> 
                        <View style={{marginTop: 5, width:"40%"}}>
                            <TagComponent 
                                isArchived={detailData.isArchived}
                                isConfirmed={detailData.isConfirmed}
                                isValid={detailData.isValid}
                            />
                        </View>
                    </View>
                </View>
            </View>


            {(userIsClient)?
                <HeaderSectionComponent title="Lawyer"/>
                :   
                <HeaderSectionComponent title="Client"/>
            }

            {/* Person client|lawyer and message (ifExist)*/}
            <View style={[style.elem_container, {marginTop:15}]}>

                <View style={style.image_and_name}>
                    {/* Profile */}
                    <View>
                    {(userIsClient)?
                        <ProfileImage profile_link={detailData.lawyer.profile_img} />
                        :   
                        <ProfileImage profile_link={detailData.client.profile_img} />
                    }
                    </View>

                    {/* Name */}
                    <View>
                        <View style={[style.ml]}>
                            <Text style={[style.text_section_highlight, styles.color_green]}>First name :</Text> 
                            {(userIsClient) ? 
                            (
                                <Text style={style.text_section_content}>{detailData.lawyer.first_name}</Text>    
                            ) : (
                                <Text style={style.text_section_content}>{detailData.client.first_name}</Text>
                            )}
                            <Text style={style.text_section_content}>{}</Text>
                        </View>
                        <View style={[style.ml]}>
                            <Text style={[style.text_section_highlight, styles.color_green]}>Last Name :</Text> 
                            {(userIsClient) ? 
                            (
                                <Text style={style.text_section_content}>{detailData.lawyer.last_name}</Text>    
                            ) : (
                                <Text style={style.text_section_content}>{detailData.client.last_name}</Text>
                            )}
                        </View>
                        <View style={[style.ml]}>
                            <Text style={[style.text_section_highlight, styles.color_green]}>Message :</Text> 
                                <Text style={[style.text_section_content, {width:"30%"}]}>
                                    {(detailData.message != null) ? detailData.message : "Not message set..."}
                                </Text>
                        </View>
                    </View>
                </View>
            </View>


            {/* Action button */}
            <HeaderSectionComponent title="Actions"/>
                
            <View style={[style.elem_container, {marginTop:15}]}>
                {/* Cancel button */}
                <View>
                    {(userIsClient) ? 
                        (detailData.isArchived)?
                        (
                            <CustomButtonWithIcon 
                            type="outlined_danger"
                            disabled={true}
                            loading={false}
                            text="Appointment has been archived"
                            />
                        ): (detailData.isValid) ? (
                            <CustomButtonWithIcon 
                            type="outlined_danger"
                            disabled={false}
                            icon="trash"
                            loading={loading}
                            text="Cancel the appointment"
                            buttonClicked={handleCancel}
                            />
                        ) :
                        (
                            <CustomButtonWithIcon 
                            type="outlined_danger"
                            disabled={true}
                            loading={false}
                            text="Cannot undo cancelement"
                            />
                        )

                    : 
                    (detailData.isArchived) ? 
                        (
                            <CustomButtonWithIcon 
                            type="outlined_danger"
                            disabled={true}
                            loading={false}
                            text="Appointment has been archived"/>
                        )
                        :
                        // (!detailData.isConfirmed)? 
                        (!detailData.isValid)? 
                        (
                            <CustomButtonWithIcon 
                            type="outlined_danger"
                            disabled={true}
                            loading={false}
                            text="Has been canceled"
                            buttonClicked={() => setModal(true)}
                            />
                        ): 
                        (detailData.isConfirmed)? (
                            <View>
                                <CustomButtonWithIcon 
                                type="outlined_danger"
                                disabled={true}
                                loading={false}
                                text="Is already confirmed"
                                buttonClicked={() => setModal(true)}
                                />

                                <CustomButtonWithIcon 
                                type="primary-low"
                                disabled={true}
                                loading={false}
                                text="Archive it"
                                buttonClicked={() => setValidationModal(true)}
                                />
                            </View>
                            
                        ) :
                            
                        (
                            <CustomButtonWithIcon 
                            type="primary"
                            icon="calendar-o"
                            loading={loading}
                            text="Save the date"
                            buttonClicked={() => setModal(true)}
                            />
                        )
                    }
                </View>
            </View>
        </View>
        </ScrollView>
        
    )
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    elem_container: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
    },
    text_section_highlight: {
        fontFamily: "dm-sans",
        fontSize:17,
        fontWeight: "600",
    },
    text_section_content:{
        fontFamily: "dm-sans",
        fontSize:15,
        fontWeight: "500",
        color: "grey",
    },
    mb: {
        marginBottom:10
    },
    ml: {
        marginLeft:10
    },
    image_and_name: {
        flexDirection: "row",
        alignItems: "center",
    }
})