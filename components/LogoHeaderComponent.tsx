import React from "react"
// import { styles } from "@/styles/mainstyle"
import { Text, StyleSheet } from "react-native"

export default function LogoComponent() {

    return (
        <Text style={[styles.mexicanHeaderFont, styles.color_yellow]}>.Call-<Text style={[styles.mexicanHeaderFont, styles.color_green]}>Law</Text></Text>
    )
} 

const styles = StyleSheet.create({
    mexicanHeaderFont: {
		fontFamily: "mexican-font",
		width: "90%",
		backgroundColor: "white",
		fontSize: 17,
		fontWeight: "600"
	},
    headerPaddingStart:{
		paddingStart: 7
	},
    color_yellow: {
		color: "#D8D51A",
	},
	color_green: {
		color: "#108B54",
	},
})
