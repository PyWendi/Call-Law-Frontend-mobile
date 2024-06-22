import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function DetailScreen() {
    return (
        <View style={styles.container}>
            <Text>Tab [Home|Settings]</Text>
            {/* <Text
            style={{
                color:"#f84aff"
            }}
            >Inside detailed function</Text>
            Tab [Home|Settings] */}
            <Link href="/">
                Go to home
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });