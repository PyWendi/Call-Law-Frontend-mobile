import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { router, useRouter } from 'expo-router';
import { styles } from '@/styles/mainstyle';
import { Toast } from '@ant-design/react-native';
import CustomButtonWithIcon from '@/components/ButtonComponent';
import InputComponent from '@/components/InputComponent';
import CustomInput from '@/components/CustomInputComponent';

export default function Modal() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
	const childClicked = () => {
		Toast.info("Child has been clicked : "+inputValue, 1)
	}

	const handleInputChange = (value:string) => {
		console.log(value)
		setInputValue(value)
		alert("Value has beel changed")
	}

	// const getInputValue = (data:string) => {
	// 	setInputValue(data)
	// 	alert(data)
	// 	childClicked()
	// }

	const [inputValue, setInputValue] = useState<string>("Hello world")

  const navigate = useRouter()
  return (

	<View style={[styles.container, styles.full_width]}>
		<Text style={[styles.mexicanFont, styles.color_yellow]}>
			.Call-
			<Text style={[styles.mexicanFont, styles.color_green]}>Law</Text>
		</Text>
		{/* <Button title='Press me' color="#108B54" onPress={() => navigate.navigate("/")}></Button> */}
		{/* <Button title='Press me' color="#108B54" ></Button> */}
		<CustomButtonWithIcon 
		loading={false}
		text="Validate update" 
		icon="check" 
		type="outlined" 
		buttonClicked={childClicked} />
		{/* <InputComponent/> */}
		<CustomInput 
			type="password" 
			placeholder='' 
			parentValue={inputValue}
			label="Simple label"
			setParenValue={setInputValue}
			/>
		<View>
			<Text>This is a loading <ActivityIndicator color="#108B54" size="large" /></Text>
		</View>
	</View>
  );
}

