import { View, Text } from "react-native"

export default function NoAppointmentFound() {


    return (
        <View style={{
            width: "90%",
            margin: "auto",
            padding: 50,
            marginTop: 20,
            borderRadius: 20,
            backgroundColor: "white"
        }}>
            <Text style={{
                textAlign: "center",
                fontFamily: "dm-sans",
                textTransform: "uppercase",
                fontWeight: "700",
                fontSize: 18,
                color: "#6d6d6d"
            }}>
                No appointment found...
            </Text>
        </View>
    )
}