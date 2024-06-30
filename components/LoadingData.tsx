import { View, Text } from "react-native"
import { ActivityIndicator } from "@ant-design/react-native"

export default function LoadingData() {


    return (
        <View style={{
            width: "90%",
            margin: "auto",
            padding: 40,
            marginTop: 20,
            borderRadius: 20,
            backgroundColor: "white"
        }}>
            <ActivityIndicator 
            size={"large"}
            color={"green"}
            />
        </View>
    )
}