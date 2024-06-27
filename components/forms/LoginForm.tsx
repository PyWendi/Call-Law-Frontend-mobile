import { View, Text } from "react-native"
import { styles } from "@/styles/mainstyle"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"

import CustomButtonWithIcon from "@/components/ButtonComponent"
import CustomInputSimple from "../CustomWithoutLineComponent"
import { login } from "@/actions/authSystemAction"


import { AppDispatch, RootState } from "@/stores/store"
import { useSelector, useDispatch } from "react-redux"
import { setIsLoading, setRequestLoading, stopIsLoading } from "@/slices/interactionSlice"


export default function LoginForm () {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);


    // const dispatch = useDispatch<AppDispatch>()
    // const loading = useSelector((state:RootState) => state.interactions)

    const validateEmail = (email:string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const InputIsvalid = (): boolean => {
        if(validateEmail(email)) {
            setIsValidEmail(true)
            if(password.length >= 8) {
                setIsPasswordValid(true)
                return true
            } else {
                setIsPasswordValid(false)
                return false
            }
        }else {
            setIsValidEmail(false)
            return false
        }
    }   

    function clearInput() {
        setEmail("")
        setPassword("")
    }

    const validate = async () => {
        setLoading(true)
        if(InputIsvalid()){
            let data = {
                email: email,
                password: password
            }
            const response = await login(data)
            if(response) {
                setLoading(false)
                clearInput()
                router.navigate("/modal")
            }
        }
        setLoading(false)
    }

    

    function navigateToLogin(){
        router.navigate("/login")
    }

    function navigateToMainPage(){
        router.navigate("/modal")
    }

    function navigateToChoice(){
        router.navigate("/choice")
    }

    useEffect(() => {
        console.log(loading)
    }, [])


    return (
        <View style={{width: "90%", margin: "auto", borderRadius: 7, paddingVertical: 20}}>
            {/* Welcome text */}
            <View style={{flex: 2, alignItems: "center", paddingBottom: 20}}>
                <Text style={[styles.auth_action_title, {fontFamily: "dm-sans"}]}>
                    Welcome back
                </Text>
            </View>

            {/* Button section */}

            <View style={[styles.form_ask, {paddingBottom: 20}]}>
                <View style={[styles.centered_elem, {width: "100%"}]}>
                    <CustomInputSimple
                    label="Email Adress" 
                    parentValue={email}
                    setParenValue={setEmail}
                    type="email"
                    placeholder="you@mail.com"
                    />
                </View>

                <View style={[styles.centered_elem, {width: "100%"}]}>
                    <CustomInputSimple 
                    label="Password" 
                    parentValue={password}
                    setParenValue={setPassword}
                    type={"password"}
                    placeholder="Your password"
                    />
                    {!isValidEmail && <Text style={{paddingStart: 20, fontSize:16, color:"red"}}>Email is invalid</Text>}
                    {!isPasswordValid && <Text style={{paddingStart: 20, fontSize:16, color:"red"}}>Password length must be over 8 chars</Text>}
                </View>

            </View>
            <View style={{width: "90%", marginBottom:10, margin: "auto"}}>
                <CustomButtonWithIcon 
                loading={loading}
                text="Validate"
                type="primary"
                buttonClicked={validate}
                />
            </View>

            <View>
                <View style={{width: "90%", marginTop:10, paddingTop: 20, margin: "auto"}}>
                    <CustomButtonWithIcon 
                    loading={false}
                    text="Go back to choice screen"
                    type="outlined"
                    buttonClicked={navigateToChoice}
                    />
                </View>
            </View>

        </View>
    )
}