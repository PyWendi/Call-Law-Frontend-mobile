import { View, Text, Button, ScrollView } from "react-native"
// import enUS from 'antd-mobile/es/locales/en-US'
import { Picker } from "@ant-design/react-native"
import type { PickerValue, PickerValueExtend } from "@ant-design/react-native"
import { Toast } from "@ant-design/react-native"
import { styles } from "@/styles/mainstyle"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"

import CustomButtonWithIcon from "@/components/ButtonComponent"
import CustomInputSimple from "../CustomWithoutLineComponent"
import { login } from "@/actions/authSystemAction"
import { getRegion } from "@/actions/RegionAction"

import { ClientSignInFormat, Region } from "@/types/modelsType"
import { registerClient } from "@/actions/clientAction"


// import { AppDispatch, RootState } from "@/stores/store"
// import { useSelector, useDispatch } from "react-redux"
// import { setIsLoading, setRequestLoading, stopIsLoading } from "@/slices/interactionSlice"


interface SelectFormat {
    label: string;
    value: any;
}

export default function SignLawyerForm () {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [location, setLocation] = useState("")
    const [region, setRegion] = useState<any>()
    const [regionDesign, setRegionDesign] = useState("")
    const [regionData, setRegionData] = useState<SelectFormat[] | []>([])
    const [domains, setDomain] = useState([])
    const [domainData, setDomainData] = useState([])
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")


    const [visible, setVisible] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const regions = [
        { value: 'Africa', label: 'Africa' },
        { value: 'Asia', label: 'Asia' },
        { value: 'Europe', label: 'Europe' },
    ];


    // const dispatch = useDispatch<AppDispatch>()
    // const loading = useSelector((state:RootState) => state.interactions)

    const validateEmail = (email:string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const openSelect = () => {
        setVisible(true)
    }

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

    const validatePassword = () => {
        if( (password === password1) && (password.length >= 8) && (password1.length >= 8)) {
            return true
        }
        return false
    }

    function clearInput() {
        setEmail("")
        setPassword("")
    }
    
    const regionMap = regionData.reduce((acc:any, curr:any) => {
        acc[curr.value] = curr.label;
        return acc;
    }, {});
    
    const handleRegionChange = (value:any) => {
        const label = regionMap[value]
        if (label){
            setRegionDesign(label)
        }
    }


    async function getRegionData () {
        const response = await getRegion()
        if (response.res) {
            console.log(response.regions)
            let data: SelectFormat[] = []
            response.regions.map((elem) => [
                data.push({
                    label: elem.designation,
                    value: elem.id
                })
            ])
            console.log(data)
            setRegion(data[0].value)
            setRegionDesign(data[0].label)
            setRegionData(data)
        }
    }

    const validate = async () => {
        setLoading(true)
        if(InputIsvalid() && validatePassword()){
            let data:ClientSignInFormat = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
                region: region,
                location: location,
                password: password
            }
            console.log(data)
            
            const response = await registerClient(data)
            if(response.res) {
                Toast.success("You have been registered.", 2)
                setLoading(false)
                router.navigate("/login")
            }
            else {
                Toast.fail("Error while performing register.", 2)
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
        getRegionData() 
    }, [])

    useEffect(() => {
        console.log(region)
        // alert("region changed")
    }, [region])


    return (
        <View style={{width: "90%", margin: "auto", borderRadius: 7, paddingBottom: 20}}>
            {/* Welcome text */}
            <View style={{flex: 1, alignItems: "center", paddingBottom: 40}}>
                <Text style={[styles.auth_action_title, {fontFamily: "dm-sans"}]}>
                    Create your account
                </Text>
            </View>

            {/* Button section */}

            <ScrollView>
                <View style={{height: 450}}>
                    
                    <View style={[styles.form_ask, {
                        paddingBottom: 5,
                        flexDirection: "row"
                        }]}>
                        <View style={[styles.centered_elem, {width: "45%"}]}>
                            <CustomInputSimple
                            label="First Name" 
                            parentValue={first_name}
                            setParenValue={setFirstName}
                            type="text"
                            placeholder=""
                            />
                        </View>

                        <View style={[styles.centered_elem, {width: "45%"}]}>
                            <CustomInputSimple 
                            label="Last Name" 
                            parentValue={last_name}
                            setParenValue={setLastName}
                            type={"text"}
                            placeholder=""
                            />
                        </View>

                    </View>

                    <View>

                        <View style={[styles.centered_elem, {width: "100%"}]}>
                            <CustomInputSimple
                            label="Email Adress" 
                            parentValue={email}
                            setParenValue={setEmail}
                            type="email"
                            placeholder="you@mail.com"
                            />
                        </View>
                    </View>

                    <View style={[styles.form_ask, {
                        // paddingBottom: 1,
                        flexDirection:"row",
                        }]}>

                        <View style={[styles.centered_elem, {width: "45%"}]}>
                            <CustomInputSimple 
                            label="Phone number" 
                            parentValue={phone}
                            setParenValue={setPhone}
                            type={"number"}
                            placeholder="+261"
                            />
                        </View>

                        <View style={[styles.centered_elem, {width: "45%"}]}>
                            <CustomInputSimple
                            label="Your location" 
                            parentValue={location}
                            setParenValue={setLocation}
                            type="text"
                            placeholder=""
                            />
                        </View>
                    </View>

                    <View style={[styles.form_ask, {paddingBottom: 5}]}>
                        <Picker
                        locale={
                            {okText: "Validate",
                                dismissText: "Dismiss"
                            }
                        }
                        data={regionData}
                        cols={3}
                        onChange={(n) => {
                            setRegion(n[0])
                            handleRegionChange(n[0])
                            console.log(n)
                        }}
                        onClose={() => {
                          setVisible(false)
                        }}
                        visible={visible}
                        value={region}
                        onOk={(v: PickerValue[], ext: PickerValueExtend) => {
                            console.log(v)
                            // alert("Button clicked: "+v)
                          setRegion(v)
                        }}>
                             <View style={{ padding: 10, width: "95%", margin:'auto' }}>
                                {/* <Button title="Cancel" /> */}
                                <CustomButtonWithIcon 
                                text={"Selected region: "+ regionDesign}
                                type="outlined"
                                buttonClicked={openSelect}
                                />
                            </View>
                        </Picker>

                        <View style={[styles.centered_elem, {width: "100%"}]}>
                            <CustomInputSimple 
                            label="Password" 
                            parentValue={password}
                            setParenValue={setPassword}
                            type={"password"}
                            placeholder=""
                            />
                            {/* {!isValidEmail && <Text style={{paddingStart: 20, fontSize:16, color:"red"}}>Email is invalid</Text>}
                            {!isPasswordValid && <Text style={{paddingStart: 20, fontSize:16, color:"red"}}>Password length must be over 8 chars</Text>} */}
                        </View>

                        <View style={[styles.centered_elem, {width: "100%"}]}>
                            <CustomInputSimple 
                            label="Confirm your password" 
                            parentValue={password1}
                            setParenValue={setPassword1}
                            type={"password"}
                            placeholder=""
                            />
                            {!isValidEmail && <Text style={{paddingStart: 20, fontSize:16, color:"red"}}>Email is invalid</Text>}
                            {!isPasswordValid && <Text style={{paddingStart: 20, fontSize:16, color:"red"}}>Password length must be over 8 chars</Text>}
                        </View>

                    </View>

                </View>


            </ScrollView>

            <View>
                
            <View style={{width: "90%", marginBottom:20, margin: "auto"}}>
                        <CustomButtonWithIcon 
                        loading={loading}
                        text="Validate"
                        type="primary"
                        buttonClicked={validate}
                        />
                    </View>

                    <View>
                        <View style={{width: "90%", paddingTop: 20, margin: "auto"}}>
                            <CustomButtonWithIcon 
                            loading={false}
                            text="Go back to choice screen"
                            type="outlined"
                            buttonClicked={navigateToChoice}
                            />
                        </View>
                    </View>
            </View>

        </View>
    )
}