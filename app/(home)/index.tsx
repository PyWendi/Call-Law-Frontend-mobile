import { Link } from 'expo-router'
import { Text, View, StyleSheet, FlatList } from 'react-native'

export default function Home() {
    return (
        <View style={style.container}>
             {/* <Text>Tab [Home|Settings]</Text> */}
            <Text style={style.textStyle}
            >Inside index.tsx</Text>

            <Text style={style.textStyle}
            >Tab [Home|Settings]</Text>

            <View style={style.container}>
                <FlatList
                    data={[
                    {key: 'Devin'},
                    {key: 'Dan'},
                    {key: 'Dominic'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                    ]}
                    renderItem={({item}) => <Text style={style.textStyle}>{item.key}</Text>}
                />
            </View>

            <Link href="/detail"
            style={{
                color:"red"
            }}>
                    Go to detail
            </Link>
        </View>
    )
}


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//   });

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30
    },
    textStyle: {
        fontSize:10,
        color: "blue"
    }
})