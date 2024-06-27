import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { StyleSheet, StatusBar, FlatList } from "react-native";
import { Region } from "@/types/modelsType";
import { useSelector } from "react-redux";
import CustomButton from "../../../components/ButtonComponent"
import React from 'react';

export default function ClientAppointments() {

    const router = useRouter()


    return (
        <View>
            <Text>
                Inside Client Appointments
            </Text>
            <CustomButton 
            text="GoAPPOINTMENTS"
            type="primary"
            buttonClicked={() => router.navigate("/home/client/")}
            icon="calentar"
            />
        </View>
    )
}