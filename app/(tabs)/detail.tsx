import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function DetailScreen() {
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
        </View>
    )
}