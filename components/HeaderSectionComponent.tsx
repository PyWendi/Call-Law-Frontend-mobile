import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { styles } from "@/styles/mainstyle";

interface headerData {
    title: string
}

const HeaderSectionComponent: React.FC<headerData> = ({title}) => {


    return (
        <View style={style.header_container}>
            <Text style={[styles.color_green, style.header_style]}>
                {title}
            </Text>
        </View>
    )
}


const style = StyleSheet.create({
    header_container:{
        width: "100%",
        backgroundColor: "white",
        borderRadius: 5,
        padding: 5,
        marginBottom: 15,
    },
    header_style: {
        textAlign: "center",
        textTransform: "uppercase",
        fontFamily: "dm-sans",
        fontWeight: "800",
        fontSize: 20
    }
})

export default HeaderSectionComponent