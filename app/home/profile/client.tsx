import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import React from 'react';
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import { FontAwesome } from "@expo/vector-icons";
import CustomButtonWithIcon from "../../../components/ButtonComponent";
import UserProfileImage from "@/components/ProfileImage";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/stores/store";

import { decodedToken } from "@/stores/tokenManagement";
import { CustomJwtPayload } from "@/types/customTokenType";

import { Toast, Modal } from "@ant-design/react-native";
import { ClientUpdateFormat } from "@/types/modelsType";

import ClientUpdateModal from "@/components/forms/ClientUpdateModal";
import { fetchClientProfile } from "@/actions/clientAction";
import { setClientProfile } from "@/slices/clientProfileSlice";

export default function ClientProfile() {
    const router = useRouter()
    const windowHeight = Dimensions.get('window').height;
    const dispatch = useDispatch<AppDispatch>()
    const profile = useSelector((state:RootState) => state.clientProfile.clientProfile)
    const [modal, setModal] = useState(false)

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

    const fetchCient = async () => {
        if(profile != null){
            const response  = await fetchClientProfile(profile.id)
            if(response.res){
                if(response.client != null) {
                    dispatch(setClientProfile(response.client))
                }
            }
        }
    }

    const handleUpdate = async () => {
        setModal(false)
        fetchCient()
    }


    return (
        <View>


            {/* Update form inside a modal box */}
            <Modal 
            visible={modal}
            style={{
                width: "75%",
                position: "absolute",
                // top: "100%",
                top: 200,
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
                height: windowHeight-50
            }}>

                {/* Image and name section in green */}
                <View style={[styles.header_container]}>
                    {/* Contain the user proile image */}
                    <View style={[styles.card_container, styles.elevate]}>
                    {/* <View style={[styles.card_container]}> */}
                        <View style={{
                            width: "20%",
                            paddingLeft: 15,
                        }}>
                            <UserProfileImage profile_link={
                                (profile) ? profile.profile_img : null
                            }/>
                        </View>

                        {/* Contain the user name and lastname */}
                        <View style={{
                            width:"70%",
                            paddingRight: 5,
                            paddingLeft: 30
                        }}>
                            {/* Lawyer name */}
                            <View style={styles.person}>
                                <Text style={[{fontWeight:"900"}, styles.title, styles.customFont]}>
                                    {/* RAKOTONDRANAIVO GILBERT */}
                                    {profile?.first_name}
                                </Text>
                            </View>

                            {/* Lawyer name */}
                            <View style={styles.person}>
                                <Text style={[{fontWeight:"500", fontSize:20,
                                     color: "#6d6d6d", 
                                    // color: "white", 
                                     marginBottom:5}, styles.customFont]}>
                                    {/* Joyaux Wendi Anderson */}
                                    {profile?.last_name}
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>


                {/* General information */}
                <View style={[styles.infomration_container, styles.elevate]}>
                    <View>
                        {/* SectionTitle */}
                        <Text style={styles.section_title}>
                            Personal information
                        </Text>

                        {/* Information Email */}
                        <View style={styles.data_section}>
                            {/* Icon and title */}
                            <View style={styles.text_icon}>
                                <FontAwesome
                                style={styles.pr}
                                name={"envelope"}
                                size={25}
                                color={"#0D6F45"}
                                />

                                <Text style={[styles.data_title, styles.customFont]}>
                                    Email address
                                </Text>
                            </View>
                            {/* Value */}
                            <View>
                                <Text style={styles.data}>
                                    {profile?.email}
                                </Text>
                            </View>
                        </View>

                        {/* Information Phone */}
                        <View style={styles.data_section}>
                            {/* Icon and title */}
                            <View style={styles.text_icon}>
                                <FontAwesome
                                style={styles.pr}
                                name={"phone"}
                                size={25}
                                color={"#0D6F45"}
                                />

                                <Text style={[styles.data_title, styles.customFont]}>
                                    Contact
                                </Text>
                            </View>
                            {/* Value */}
                            <View>
                                <Text style={styles.data}>
                                    {profile?.phone}
                                </Text>
                            </View>
                        </View>

                        {/* Information location */}
                        <View style={styles.data_section}>
                            {/* Icon and title */}
                            <View style={styles.text_icon}>
                                <FontAwesome
                                style={styles.pr}
                                name={"map-marker"}
                                size={25}
                                color={"#0D6F45"}
                                />

                                <Text style={[styles.data_title, styles.customFont]}>
                                    Location
                                </Text>
                            </View>
                            {/* Value */}
                            <View>
                                <Text style={styles.data}>
                                    {profile?.location}
                                </Text>
                            </View>
                        </View>

                        {/* Information region */}
                        <View style={styles.data_section}>
                            {/* Icon and title */}
                            <View style={styles.text_icon}>
                                <FontAwesome
                                style={styles.pr}
                                name={"map"}
                                size={25}
                                color={"#0D6F45"}
                                />

                                <Text style={[styles.data_title, styles.customFont]}>
                                    Region
                                </Text>
                            </View>
                            {/* Value */}
                            <View>
                                <Text style={styles.data}>
                                    {profile?.region.designation}
                                </Text>
                            </View>
                        </View>



                    </View>
                </View>


                {/* Action like update */}
                <View style={[styles.infomration_container, styles.elevate]}>
                    {/* Update button */}
                    <View>
                        <View style={{paddingBottom: 10}}>
                            <CustomButtonWithIcon 
                            type="outlined"
                            icon="edit"
                            loading={false}
                            text="EDIT YOUR PROFILE"
                            buttonClicked={() => setModal(true)}
                            />
                        </View>

                        <CustomButtonWithIcon 
                        type="primary"
                        // icon="home"
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
