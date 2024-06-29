import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { CustomJwtPayload } from "@/types/customTokenType";
import { decodedToken } from "@/stores/tokenManagement";
import React from 'react';
import MenuButton from "@/components/MenuButton";
import { useEffect, useState } from "react";
import { checkAuthentitcation } from "@/actions/clientAction";

export default function ClientHome() {
    const router = useRouter()

    const [profileRoute, setProfileRoute] = useState("")
    // const [appointment, setAppointment] = useState("")
    // const [appointment, setAppointment] = useState("")
    // const [appointment, setAppointment] = useState("")
    // const [appointment, setAppointment] = useState("")
    // const [appointment, setAppointment] = useState("")


    function navigateToClientHome(){
        router.navigate("/home/client/")
    }

    function navigateToLawyerHome(){
        router.navigate("/home/lawyer/")
    }

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

    useEffect(() => {
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
        // borderColor: "#108B54",
        // borderWidth: 2,
    }
})