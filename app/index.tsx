import { View, Text, SafeAreaView } from "react-native"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { checkAuthentitcation } from "@/actions/clientAction"
import { styles } from "@/styles/mainstyle"
import CustomButtonWithIcon from "@/components/ButtonComponent"
import { CustomJwtPayload } from "@/types/customTokenType"
import { decodedToken } from "@/stores/tokenManagement"
import {Svg, Path } from "react-native-svg"


export default function HomeScreen() {

    const router = useRouter()

    function navigateToLogin(){
        router.navigate("/login")
    }

    function navigateToSignUp(){
        router.navigate("/choice")
    }

    function navigateToClientHome(){
        router.navigate("/home/client/")
    }

    function navigateToLawyerHome(){
        router.navigate("/home/lawyer/")
    }

    async function checkAuth() {
        const response = await checkAuthentitcation()
        if (response){
            const decodedData:CustomJwtPayload | null = await decodedToken()
            
            if (decodedData) {
                if(decodedData.isClient) {
                    navigateToClientHome()
                } else {
                    navigateToLawyerHome()
                }
            }
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <>
            <View style={styles.waveTop}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1DAC69" fillOpacity="1" d="M0,0L40,16C80,32,160,64,240,101.3C320,139,400,181,480,170.7C560,160,640,96,720,74.7C800,53,880,75,960,112C1040,149,1120,203,1200,224C1280,245,1360,235,1400,229.3L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg> */}
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" width="100%" height="100%">
                    <Path fill="#1DAC69" fillOpacity="1" d="M0,0L40,16C80,32,160,64,240,101.3C320,139,400,181,480,170.7C560,160,640,96,720,74.7C800,53,880,75,960,112C1040,149,1120,203,1200,224C1280,245,1360,235,1400,229.3L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z" />
                </Svg>
            </View>

            <SafeAreaView style={{
                flex:1,
                justifyContent: "center"
            }}>
                <View>
                    {/* Welcome text */}
                    <View style={{flex: 2, alignItems: "center"}}>
                        <View>
                            <Text style={[styles.mexicanFont, styles.color_yellow]}>
                                .Call-
                                <Text style={[styles.mexicanFont, styles.color_green]}>Law</Text>
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.welcome_text}>
                                "Acting or looking for justice."
                            </Text>
                        </View>
                    </View>

                    {/* Button section */}

                    <View style={styles.home_ask}>
                        <View style={{width: "100%", marginBottom:10}}>
                            <CustomButtonWithIcon 
                            loading={false}
                            text="Sign Up"
                            type="primary"
                            buttonClicked={navigateToSignUp}
                            />
                        </View>

                        
                        <Text style={{fontSize: 18, marginBottom:15}}>
                            or
                        </Text>

                        <View style={{width: "100%"}}>
                            <CustomButtonWithIcon 
                            loading={false}
                            text="Sign In"
                            type="outlined"
                            buttonClicked={navigateToLogin}
                            />
                        </View>

                    </View>

                </View>
            </SafeAreaView>

            <View style={styles.waveBottom}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1DAC69" fillOpacity="1" d="M0,288L60,288C120,288,240,288,360,261.3C480,235,600,181,720,149.3C840,117,960,107,1080,128C1200,149,1320,203,1380,229.3L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg> */}
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" width="100%" height="100%">
                    <Path fill="#1DAC69" fillOpacity="1" d="M0,288L60,288C120,288,240,288,360,261.3C480,235,600,181,720,149.3C840,117,960,107,1080,128C1200,149,1320,203,1380,229.3L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
                </Svg>
            </View>
        </>
    )
}