import React from "react"
import { styles } from "@/styles/mainstyle"
import { Text } from "react-native"

const LogoComponent: React.FC = () => {

    return (
        <Text style={[styles.mexicanHeaderFont, styles.headerPaddingStart, styles.color_yellow]}>.Call-<Text style={[styles.mexicanHeaderFont, styles.color_green]}>Law</Text></Text>
    )
} 

export default LogoComponent