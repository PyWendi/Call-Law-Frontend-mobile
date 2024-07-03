import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { CustomJwtPayload } from "@/types/customTokenType";
import React from 'react';
import MenuButton from "@/components/MenuButton";
import { useEffect, useState } from "react";

import { decodedToken } from "@/stores/tokenManagement";
import { checkAuthentitcation } from "@/actions/clientAction";

import { useDispatch, UseDispatch } from "react-redux";
import { getAppointmentsForClient } from "@/actions/appointmentAction";
import { setAppointment } from "@/slices/appointmentSlice";

import { fetchClientProfile } from "@/actions/clientAction";
import { fetchSingleLawyer } from "@/actions/LawyerAction";
import { setClientProfile } from "@/slices/clientProfileSlice";
import { setLawyerProfile } from "@/slices/lawyerProfileSlice";

export default function LawyerHome() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [profileRoute, setProfileRoute] = useState("")
    const [loading, setLoading] = useState(false)


    async function checkAuth() {
        const response = await checkAuthentitcation()
        if (response){
            const decodedData:CustomJwtPayload | null = await decodedToken()
            
            if (decodedData) {
                if(decodedData.isClient) {
                    setProfileRoute("/home/profile/client")
                } else {
                    setProfileRoute("/home/profile/lawyer")
                }
            }
        } else {
            router.navigate("/")
        }
    }

    const fetchAllAppointments = async () => {
        setLoading(true)
        const response = await getAppointmentsForClient()
        if(response.res) {
            dispatch(setAppointment(response.appointments))
        } else {
            console.log(response)
        }
        setLoading(false)
    }

    const setProfile = async () => {
        const decodedData:CustomJwtPayload | null = await decodedToken()

        if(decodedData){
            if(decodedData.isClient){
                // If the current user is a client
                const response = await fetchClientProfile(decodedData.user_id)
                if(response.res){
                    if(response.client != null) dispatch(setClientProfile(response.client))
                } else router.replace("/")

            } else {
                // If the current user is a lawyer
                const response = await fetchSingleLawyer(decodedData.user_id)
                if(response.res){
                    if(response.lawyer != null) dispatch(setLawyerProfile(response.lawyer))
                } else router.replace("/")

            }
        } else {
            router.replace("/")
        }
    }

    useEffect(() => {
        setProfile()
        fetchAllAppointments()
        checkAuth()
    }, [])
    

    return (
        <>
            <View style={style.container}>
                {/* App | Lawyers */}
                <View style={[style.divider]}>
                    <TouchableOpacity style={style.button_divider}
                    activeOpacity={0.6}
                    onPress={() => router.navigate("/home/client/appointment")}
                    >
                        <MenuButton icon="calendar" title="Appointment" />
                    </TouchableOpacity>

                    <TouchableOpacity style={style.button_divider}
                    activeOpacity={0.6}
                    onPress={() => router.navigate("/home/client/search")}
                    >
                        <MenuButton icon="users" title="Lawyers" />
                    </TouchableOpacity>
                </View>

                {/* Archive | Profile */}
                <View style={[style.divider]}>
                    <TouchableOpacity style={style.button_divider}
                    activeOpacity={0.6}
                    onPress={() => router.navigate("/home/utils/archive")}
                    >
                        <MenuButton icon="calendar-check-o" title="Archive" />
                    </TouchableOpacity>

                    <TouchableOpacity style={style.button_divider}
                    activeOpacity={0.6}
                    onPress={async () => {
                        router.navigate(profileRoute)
                    }}
                    >
                        <MenuButton icon="user-circle-o" title="Profile" />
                    </TouchableOpacity>
                </View>

                {/* Notifications | Setting */}
                <View style={[style.divider]}>
                    <TouchableOpacity style={style.button_divider}
                    activeOpacity={0.6}
                    onPress={() => router.navigate("/home/utils/notification")}
                    >
                        <MenuButton icon="bell-o" title="Notification" />
                    </TouchableOpacity>

                    <TouchableOpacity style={style.button_divider}
                    activeOpacity={0.6}
                    onPress={() => router.navigate("/home/utils/setting")}
                    >
                        <MenuButton icon="cogs" title="Setting" />
                    </TouchableOpacity>
                </View>
            </View>    
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        },
    textStyle: {
        fontSize:20,
        color: "blue"
    },
    divider: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 50,
    },
    button_divider: {
        width: "40%",
        padding: 30,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#d1d1d1",
        shadowRadius: 10,
    }
})