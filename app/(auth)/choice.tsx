import { View, Text, SafeAreaView, Image } from "react-native"
import CustomButtonWithIcon from "@/components/ButtonComponent"
import { styles } from "@/styles/mainstyle"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { checkAuthentitcation } from "@/actions/clientAction"

export default function HomeScreen() {

    const router = useRouter()

    function navigateToClient() {
        router.navigate("/client")
    }

    function navigateToLawyer() {
        router.navigate("/lawyer")
    }
    
    function navigateToHome() {
        router.navigate("/")
    }

    async function checkAuth() {
        const response = await checkAuthentitcation()
        if (response) navigateToHome()
    }

    useEffect(() => {
        // checkAuth()
    }, [])

    return (
        <>
            <SafeAreaView style={{
                flex:1,
                justifyContent: "center"
            }}>
                <View>
                    {/* Welcome text */}
                    <View style={{flex: 1, alignItems: "center"}}>
                        <View>
                            <Image style={{width:150, height:150}}
                            source={require("../../assets/images/law.png")}>

                            </Image>
                        </View>

                        <View style={{margin:"auto"}}>
                            <Text style={[styles.welcome_text, {textAlign: "center", marginBottom: 40, width: "80%", margin:"auto"}]}>
                                Choose the type of account you want to use
                            </Text>
                        </View>
                    </View>

                    {/* Button section */}

                    <View style={styles.home_ask}>
                        <View style={{width: "100%", marginBottom:10, marginTop:20}}>
                            <CustomButtonWithIcon 
                            loading={false}
                            text="REGISTER AS CLIENT"
                            type="primary"
                            buttonClicked={navigateToClient}
                            />
                        </View>

                        <Text style={{fontSize: 18, marginBottom:15}}>
                            or
                        </Text>

                        <View style={{width: "100%"}}>
                            <CustomButtonWithIcon 
                            loading={false}
                            text="REGISTER AS LAWYER"
                            type="primary"
                            buttonClicked={navigateToLawyer}
                            />
                        </View>

                        <View style={{width: "100%", marginTop:15}}>
                            <CustomButtonWithIcon 
                            loading={false}
                            text="Go back to home"
                            type="outlined"
                            buttonClicked={navigateToHome}
                            />
                        </View>
                    </View>

                </View>
            </SafeAreaView>

            <View style={styles.waveBottom}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1DAC69" fillOpacity="1" d="M0,288L60,288C120,288,240,288,360,261.3C480,235,600,181,720,149.3C840,117,960,107,1080,128C1200,149,1320,203,1380,229.3L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
            </View>
 
        </>
    )
}