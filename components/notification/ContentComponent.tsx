import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import { Notification } from "@/types/modelsType";
import { FontAwesome } from "@expo/vector-icons";
import { formatDistanceToNow, parseISO } from "date-fns";
import NotifBadge from "./NotifBadge";

interface NotifData {
    notif: Notification,
    index: number
}

const NotificationContentComponent:React.FC<NotifData> = ({index,notif}) => {

    const formatCreatedDate = formatDistanceToNow(parseISO(notif.created_at))

    return (
        <>
            <View style={style.container}>
                {/* type and date */}
                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <View>
                        <NotifBadge 
                        type={notif.type}
                        />
                    </View>

                    <View>
                        <Text style={style.date}>
                            {formatCreatedDate} ago
                        </Text>
                    </View>
                </View>

                {/* People */}
                <View style={style.people_container}>
                    <View>
                        <FontAwesome 
                        name={"user-o"}
                        size={20}
                        color={"#0D6F45"}
                        />
                    </View>

                    <View style={{
                        paddingLeft: 10,
                        flexDirection: "row",
                        alignItems: "center",    
                    }}>
                        <Text style={{paddingRight: 3, fontFamily: "dm-sans", fontSize: 14, textTransform: "uppercase", color: "#108B54"}}>
                            {notif.author.first_name}
                        </Text>
                        <Text style={{fontFamily: "dm-sans", fontSize: 14, color: "#108B54"}}>
                            {notif.author.last_name}
                        </Text>
                    </View>
                </View>

                {/* Appointment title */}
                <View style={{
                    marginTop:5,
                    flexDirection: "row",
                    alignItems: 'center',
                }}>
                    <Text style={{fontFamily: "dm-sans", color: "#108B54"}}>
                        Appointment Title :
                    </Text>
                    <Text style={{fontFamily: "dm-sans", paddingLeft: 5}}>
                        <Text>
                            {notif.appointment.title}
                        </Text>
                    </Text>
                </View>

                {/* Appointment case speciality */}
                <View style={{
                    marginTop:5,
                    flexDirection: "row",
                    alignItems: 'center',
                }}>
                    <Text style={{fontFamily: "dm-sans", color: "#108B54"}}>
                        Appointment Speciality :
                    </Text>
                    <Text style={{fontFamily: "dm-sans", paddingLeft: 5}}>
                        <Text>
                            {notif.appointment.speciality.name}
                        </Text>
                    </Text>
                </View>

            </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {      
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    date:{
        textTransform: 'capitalize',
        color: "#0C4830",
        fontFamily: "dm-sans",
        fontSize: 12
    }, 
    people_container: {
        width: "100%",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    }
})


export default NotificationContentComponent;