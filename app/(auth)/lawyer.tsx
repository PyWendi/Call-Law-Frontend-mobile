import { View, SafeAreaView } from "react-native"
import { useRouter } from "expo-router"
import { useEffect} from "react"
import { checkAuthentitcation } from "@/actions/clientAction"
import { styles } from "@/styles/mainstyle"
import { CustomJwtPayload } from "@/types/customTokenType"
import { decodedToken } from "@/stores/tokenManagement"
import SignLawyerForm from "@/components/forms/SignLawyer"
import { Svg, Path } from "react-native-svg"


export default function SignLawyer() {

    const router = useRouter()

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
            <SafeAreaView style={{
                flex:1,
                width: "100%",
                justifyContent: "center",
            }}>
                <SignLawyerForm/>
            </SafeAreaView>

            <View style={styles.waveBottom}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1DAC69" fillOpacity="1" d="M0,160L80,186.7C160,213,320,267,480,250.7C640,235,800,149,960,144C1120,139,1280,213,1360,250.7L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg> */}
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" width="100%" height="100%">
                <Path fill="#1DAC69" fillOpacity="1" d="M0,160L80,186.7C160,213,320,267,480,250.7C640,235,800,149,960,144C1120,139,1280,213,1360,250.7L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
            </Svg>
            </View>
        </>
    )
}