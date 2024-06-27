import React from "react"
import { styles } from "@/styles/mainstyle"
import { Text } from "react-native"

const LogoComponent: React.FC = () => {

    return (
        <Text style={[styles.mexicanFont, styles.color_yellow]}>.Call-<Text style={[styles.mexicanFont, styles.color_green]}>Law</Text></Text>
    )
} 

export default LogoComponent