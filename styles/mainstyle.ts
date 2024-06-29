import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    mexicanFont: {
		fontFamily: "mexican-font",
		fontSize: 40,
		fontWeight: "600"
	},
	mexicanHeaderFont: {
		fontFamily: "mexican-font",
		width: "100%",
		backgroundColor: "white",
		fontSize: 30,
		fontWeight: "600"
	},
	headerPaddingStart:{
		paddingStart: 10
	},
	color_yellow: {
		color: "#D8D51A",
	},
	color_green: {
		color: "#108B54",
	},

	full_width: {
		width: "100%"
	},
	container: {
		width: "100%",
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	welcome_text:{
		fontSize: 20,
		color: "#108B54",
		marginBottom:50
	},
	home_ask:{
		margin: "auto",
		width: "75%",
		flex:1,
		alignItems: "center",
		justifyContent: "center"
	},
	form_ask:{
		margin: "auto",
		width: "100%",
	},
	// waveTop: {
	// 	position: 'absolute',
	// 	top: 0,
	// 	left: 0,
	// 	right: 0,
	// 	overflow: "hidden",
	//   	width: '100%',
	// 	height: '40%', // Adjust based on your needs
	// 	padding:0,
	// },
	waveTop: {
		position: 'absolute',
		top: -140,
		left: 0,
		right: 0,
		overflow: "hidden",
	  	width: '100%',
		height: '40%', // Adjust based on your needs
		padding:0,
	},
	waveBottom: {
		position: 'absolute',
		bottom: -140,
		left: 0,
		padding: 0,
		margin:0,
		overflow: "hidden",
		zIndex: -1,
		width: '100%', // Adjust based on your needs
		height: '40%', // Adjust based on your needs
		transform: [{ rotate: '-180deg' }],
	  },
	auth_action_title: {
		color: "#108B54",
		fontSize: 30
	},
	centered_elem: {
		margin: "auto"
	},

	tab_elevate_style: {
		borderTopLeftRadius:50,
		borderTopRightRadius: 50,
		paddingHorizontal:30,
		paddingVertical:20,
		backgroundColor: "white",
		
		shadowColor: "#f6f6f6",
		shadowRadius: 70,
		shadowOffset: {
			width: 0,
			height: -20
		}
	}
})