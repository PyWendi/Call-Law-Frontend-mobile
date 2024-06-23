import { Link } from 'expo-router'
import { Text, ScrollView, View, StyleSheet, FlatList, SafeAreaView, Button, StatusBar, Alert } from 'react-native'
import { Toast } from '@ant-design/react-native';
import { useEffect } from 'react'

import { TokenManagement } from '@/types/customTokenType';
import { useSelector, useDispatch } from 'react-redux'

// Type import 
import { Region } from '@/types/modelsType'

// Actions
import { getRegion } from '@/actions/RegionAction'
import { fetchLawyer, updateLawyer } from '@/actions/LawyerAction'
import { login } from '@/actions/authSystemAction'

// Slice reducers
import { setRegion, addRegion } from '@/slices/regionSlice'
import { tokenManagement } from '@/stores/tokenManagement';

export default function Home() {

    let regions:Region[] | [] = useSelector((state:any) => state.regions.regions)

    const dispatch = useDispatch()

    const getRegionFromAction = async () => {
        const response = await getRegion() 
        if (response.res) {
            dispatch(setRegion(response.regions))
        }
    }

    const updateLawyerProfile = async () => {
        const response = await updateLawyer(4, {
            region: 4,
            domains: [2],
            first_name: "Rakoto",
            last_name: "Zavoka",
            email: "avocado@gmail.com",
            phone: "1234567890",
            location: "VF 34 Mahamasina Nord",
            availability: "",
        })
        if(response.res){
            console.log("data has been updated")
        }
        console.log("Lawyer not fetched")
    }
    
    const getLawyerProfile = async () => {
        const response = await fetchLawyer(4)
        if(response.res){
            console.log("data is fetched")
        }
        console.log("Lawyer not fetched")
    }

    const logUser = async () => {
        const response = await login({
            email: "avocado@gmail.com",
            password: "Darkness21"
        })

        if (response) {
            Toast.success(`User loged in successfully: ${await tokenManagement.getJwt()} `)
        } else {
            Toast.fail("Error when performing the authentication")
        }
    }


    const addNewRegionValue = () => {
        dispatch(addRegion({id:8, designation: "My custom region"}))
    }

    
    useEffect(() => {
        // getRegionFromAction()
        // getLawyerProfile()
        // updateLawyerProfile()
        logUser()
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
                <View
                >
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

                <View>
                    <Button
                    title='Tailwing button'>
                        
                    </Button>
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