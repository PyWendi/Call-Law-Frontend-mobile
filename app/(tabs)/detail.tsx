import { Link } from "expo-router";
import { View, Text } from "react-native";
import { StyleSheet, StatusBar, FlatList } from "react-native";
import { Region } from "@/types/modelsType";
import { useSelector } from "react-redux";
import CustomButton from "../../components/ButtonComponent"
import React from 'react';

export default function DetailScreen() {

    let regions:Region[] | [] = useSelector((state:any) => state.regions.regions)

    return (
        <View>
            <Text
            style={{
                color:"#f84aff"
            }}
            >Inside detailed function</Text>
            <Link href="/settings">
                Go to setting
            </Link>
            <View style={style.container}>
                <FlatList
                    data={regions}
                    renderItem={({item}) => <Text style={style.textStyle}>{item.designation}</Text>}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <CustomButton/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30
    },
    textStyle: {
        fontSize:20,
        color: "blue"
    }
})