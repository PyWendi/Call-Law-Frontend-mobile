import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { StyleSheet, StatusBar, FlatList } from "react-native";
import { Region } from "@/types/modelsType";
import { useSelector } from "react-redux";
import CustomButton from "../../../components/ButtonComponent"
import React from 'react';

export default function LawyerSearch() {

    const router = useRouter()


    return (
        <View>
            <Text>
                Inside Search
            </Text>
            <CustomButton 
            text="inside search now go home"
            type="outlined"
            buttonClicked={() => router.navigate("/home/lawyer/")}
            icon="home"
            />
        </View>
    )
}