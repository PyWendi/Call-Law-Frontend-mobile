import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { StyleSheet, StatusBar, FlatList } from "react-native";
import { Region } from "@/types/modelsType";
import { useSelector } from "react-redux";
import CustomButton from "../../../components/ButtonComponent"
import React from 'react';

export default function ClientProfile() {

    const router = useRouter()


    return (
        <View>
            <Text>
                Inside Client profile
            </Text>
            <CustomButton 
            text="Go back hoome"
            type="warning"
            buttonClicked={() => router.navigate("/home/client/")}
            icon="home"
            />
        </View>
    )
}