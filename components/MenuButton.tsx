import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface ButtonProps {
    title: string;
    icon: string;
}

const MenuButton: React.FC<ButtonProps> = ({title, icon}) => {


    return (
        <View style={style.button_section}>
            <Text style={style.text_style}>{title}</Text>
            <FontAwesome size={30} name={icon} color={"#108B54"}/>
        </View>
    )
} 


const style = StyleSheet.create({
    button_section: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "center",
    },
    text_style: {
        fontFamily: "dm-sans",
        color: "#108B54",
        fontSize: 17,
        fontWeight: "500",
        textTransform: "uppercase",
        paddingBottom: 10
    }
})

export default MenuButton