import { Link } from 'expo-router'
import { Text, ScrollView, View, StyleSheet, FlatList, SafeAreaView, Button, StatusBar, Alert } from 'react-native'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Region } from '@/types/modelsType'
import { getRegion } from '@/actions/RegionAction'
import { setRegion, addRegion } from '@/slices/regionSlice'

export default function Home() {

    let regions:Region[] | [] = useSelector((state:any) => state.regions.regions)
    
    const dispatch = useDispatch()

    const getRegionFromAction = async () => {
        const response = await getRegion() 
        if (response.res) {
            dispatch(setRegion(response.regions))
        }
    }

    const addNewRegionValue = () => {
        dispatch(addRegion({id:8, designation: "My custom region"}))
    }
    
    useEffect(() => {
        getRegionFromAction()
        console.log(regions)
    }, [])

    const DATA = [
        {
          title: 'Main dishes',
          data: ['Pizza', 'Burger', 'Risotto'],
        },
        {
          title: 'Sides',
          data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
        },
      ];      


    return (
        <SafeAreaView 
        style={styles.container}>
            <ScrollView>
                <View style={style.container}>
                    {/* <Text>Tab [Home|Settings]</Text> */}
                    <Text style={style.textStyle}
                    >Inside index.tsx</Text>

                    <Text style={style.textStyle}
                    >Tab [Home|Settings]</Text>

                    <View style={style.container}>
                        <FlatList
                            data={regions}
                            renderItem={({item}) => <Text style={style.textStyle}>{item.designation}</Text>}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                    <Link href="/detail"
                    style={{
                        color:"red"
                    }}>
                            Go to detail
                    </Link>
                    <Button
                    color="#ad45fd"
                    title="Add Region"
                    onPress={() => addNewRegionValue()}
                    />
                    <Button
                    title="Right button"
                    onPress={() => Alert.alert('Right button pressed')}
                    />
                </View>
                
            </ScrollView>
        </SafeAreaView>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30
    },
    textStyle: {
        fontSize:20,
        color: "blue"
    }
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
    },
    header: {
      fontSize: 12,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 12,
    },
    scrollView: {
        height: 20,
        width: "100%",
        backgroundColor: 'pink',
        marginHorizontal: 20,
      },
  }); 