import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Modal } from "@ant-design/react-native";
import React from 'react';
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

import CustomButtonWithIcon from "../../../components/ButtonComponent";
import UserProfileImage from "@/components/ProfileImage";
import PersonalInformation from "@/components/profile/PersonalInformation";
import ProfesionalInformation from "@/components/profile/ProfesionalInformation";
import AddAppointment from "@/components/forms/AddAppointment";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/stores/store";

import { decodedToken } from "@/stores/tokenManagement";
import { CustomJwtPayload } from "@/types/customTokenType";

import NoResultFound from "@/components/NoResultFound";

import ClientUpdateModal from "@/components/forms/ClientUpdateModal";
import { fetchSingleLawyer } from "@/actions/LawyerAction";
import { setLawyerProfile } from "@/slices/lawyerProfileSlice";

export default function LawyerProfile() {
    const router = useRouter()
    const { lawyer_id, isClient } = useLocalSearchParams()
    const windowHeight = Dimensions.get('window').height;
    const dispatch = useDispatch<AppDispatch>()
    const profile = useSelector((state:RootState) => state.lawyerProfile.lawyerProfile)
    const [modal, setModal] = useState(false)
    const [appointmentModal, setAppointmentModal] = useState(false)
    const [isVisitor, setIsVisitor] = useState(false)

    const redirectToHome = async () => {
        const decodedData: CustomJwtPayload | null = await decodedToken()
        if(decodedData){
            if(decodedData.isClient) {
                router.replace("/home/client/")
            } else {
                router.replace("/home/lawyer/")
            }
        } else {
            router.replace("/")
        }
    }

    const handleTrigger = () => {
        setModal(true)
    }

    const fetchCient = async () => {
        const token: CustomJwtPayload | null  = await decodedToken()

        if(token){
            if(lawyer_id != null) {
                setIsVisitor((parseInt(lawyer_id) === token.user_id) ? false : true)
                const response = await fetchSingleLawyer(parseInt(lawyer_id))
                if(response.res){
                    if(response.lawyer){
                        dispatch(setLawyerProfile(response.lawyer))
                        
                        // router.navigate("/home/appointments/0")
                    }
                }
            }
            else if(profile != null){
                setIsVisitor(false)
                const response  = await fetchSingleLawyer(profile.id)
                if(response.res){
                    if(response.lawyer != null) {
                        console.log(response.lawyer)
                        dispatch(setLawyerProfile(response.lawyer))
                    }
                }
            }
        } else router.replace("/")
    }

    const handleUpdate = async () => {
        setModal(false)
        await fetchCient()
    }

    const handleAppointment = () => {
        setAppointmentModal(false)
    }

    useEffect(() => {
        fetchCient()
    }, [])

    return (
        <View>


            {/* Add appointment modal */}
            <Modal 
            visible={appointmentModal}
            style={{
                width: "75%",
                position: "absolute",
                // top: "100%",
                top: 240,
                left: "12%",
                borderRadius: 6,
                backgroundColor: "white"
            }}
            >

                <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                    
                    <AddAppointment lawyer_id={profile?.id} callback={handleAppointment} />

                    <CustomButtonWithIcon 
                    loading={false}
                    text="Close modal"
                    type="outlined_danger"
                    buttonClicked={() => setAppointmentModal(false)}
                    />
                </View>


            </Modal>

            {/* Update form inside a modal box */}
            <Modal 
            visible={modal}
            style={{
                width: "75%",
                position: "absolute",
                // top: "100%",
                top: 100,
                left: "12%",
                borderRadius: 6,
                backgroundColor: "white"
            }}
            >

                <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                    
                    <ClientUpdateModal client={profile} callback={handleUpdate} />

                    <CustomButtonWithIcon 
                    loading={false}
                    text="Close modal"
                    type="outlined_danger"
                    buttonClicked={() => setModal(false)}
                    />
                </View>


            </Modal>
            
            <ScrollView style={{
                height: windowHeight-60
            }}>

                <View style={[styles.header_container]}>
                    <View style={[styles.card_container, styles.elevate]}>
                        <View style={{
                            width: "20%",
                            paddingLeft: 15,
                        }}>
                            <UserProfileImage profile_link={
                                (profile) ? profile.profile_img : null
                            }/>
                        </View>

                        <View style={{
                            width:"70%",
                            paddingRight: 5,
                            paddingLeft: 30
                        }}>
                            <View style={styles.person}>
                                <Text style={[{fontWeight:"900"}, styles.title, styles.customFont]}>
                                    {profile?.first_name}
                                </Text>
                            </View>

                            <View style={styles.person}>
                                <Text style={[{fontWeight:"500", fontSize:20,
                                     color: "#6d6d6d", 
                                    // color: "white", 
                                     marginBottom:5}, styles.customFont]}>
                                    {profile?.last_name}
                                </Text>
                            </View>

                            {(isClient === "true") && (
                                <View style={styles.person}>
                                    <CustomButtonWithIcon
                                    type="primary"
                                    icon="calendar-plus-o"
                                    text="Take anappointment"
                                    buttonClicked={() => setAppointmentModal(true)}
                                    />
                                </View>
                            )}
                        </View>

                    </View>
                </View>


                {/* General information */}
                {
                    (profile != null)? 
                    (
                        <View style={[styles.infomration_container, styles.elevate]}>
                            <PersonalInformation  
                            data={{
                                id: profile.id,
                                domains: profile.domains,
                                email: profile.email,
                                location: profile.location,
                                phone: profile.phone,
                                region: profile.region.designation
                            }}
                            trigger={handleTrigger}
                            isVisitor={isVisitor}
                            />
                        </View>

                    ) : 
                    (
                        <NoResultFound 
                        text="Any information found, 
                        please go to the landing page and sign in again..."
                        />
                    )
                }


                {/* General Availabilities, experiences, notices */}
                {
                    (profile != null)? 
                    (
                        <View style={[styles.infomration_container, styles.elevate]}>
                            <ProfesionalInformation 
                            id={profile.id}
                            isVisitor={isVisitor}
                            />
                        </View>

                    ) : 
                    (
                        <NoResultFound 
                        text="Any information found, 
                        please go to the landing page and sign in again..."
                        />
                    )
                }

                



                {/* Action button to go home */}
                <View style={[styles.infomration_container, styles.elevate]}>
                    <View>
                        <CustomButtonWithIcon 
                        type="primary"
                        buttonClicked={redirectToHome}
                        text="Go back home"
                        />
                    </View>
                </View>

                
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    header_container:{
        paddingHorizontal:10,
        paddingVertical:20,
        width: "100%",
        marginBottom:10,
        // backgroundColor: "#1DAC69",
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    },
    
    
    card_container:{
        flexDirection: "row",
        justifyContent: "space-between",     
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 15,
        borderRadius:10
    },

    infomration_container:{
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor: "white",
        width: "95%",
        margin:"auto",
        marginBottom:20,
        borderRadius: 10
    },

    section_title:{
        fontFamily: "dm-sans",
        fontSize: 23,
        color: "#0D6F45",
        fontWeight: "800",
        borderBottomWidth: 2,
        borderColor: "#0D6F45",
        borderStyle: "solid",
        paddingBottom: 10,
        marginBottom: 20

    },

    data_section:{
        marginBottom: 10
    },

    text_icon:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    data_title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#0D6F45"
        // color: "#0D6F45"
    },

    data:{
        fontFamily: "dm-sans",
        paddingTop: 5,
        paddingLeft: 25,
        fontWeight: "500",
        fontSize:17,
        color:"#6d6d6d"
    },

    pr:{
        paddingRight: 10,
    },

    information_card_container:{
        backgroundColor: 'white',

    },

    action_container:{

    },

    person: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        marginLeft: 10 
    },

    title: {
        width: "90%",
        fontSize: 19,
        marginBottom: 5,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: "#4d4d4d",
        // color: "#0D6F45"  ,
        // color: "white",
    },
    customFont:{
        fontFamily: "dm-sans"
    },
    elevate:{
        shadowColor: "#d4d4d4",
        shadowRadius: 10,
    }
})
