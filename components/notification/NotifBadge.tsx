import React, {useState} from "react";
import { View, Text, StyleSheet } from "react-native";

interface TypeProps {
    type:string
}

const NotifBadge:React.FC<TypeProps> = ({type}) => {

    let color = null
    switch (type) {
        case "demande":
            color = style.demand
            break;

        case "annulation":
            color = style.annulation
            break;

        case "confirmation":
            color = style.confirmation
            break;
    }

    return (
        <>
            <View style={[style.container, color]}>
                <Text style={{
                    color: "white",
                    fontFamily: "dm-sans",
                    fontSize: 12
                }}>
                    {type}
                </Text>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    demand:{
        textTransform: "capitalize",
        backgroundColor: "#0D6F45" //green
    },

    annulation:{
        textTransform: "capitalize",
        backgroundColor: "#D45F5F" //red
    },

    confirmation:{
        textTransform: "capitalize",
        backgroundColor: "#2281A7" //blue
    }
})

export default NotifBadge;