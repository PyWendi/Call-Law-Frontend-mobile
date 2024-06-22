import  {jwtDecode} from 'jwt-decode'
import { CustomJwtPayload, TokenManagement } from '@/types/customTokenType';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const decodedToken = async (): Promise<CustomJwtPayload | null> => {
    const token = await AsyncStorage.getItem("token")
    if(token != null) {
        return jwtDecode<CustomJwtPayload>(token)
    }
    return null 
}

export const tokenManagement: TokenManagement = {
    getJwt: async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            return token ? token : null
        } catch (error) {
            console.log(error)
            return null
        }
    },

    setJwt: async (token) => {
        try {
            await AsyncStorage.setItem("token", token)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },
    deleteJwt: async () => {
        try {
            await AsyncStorage.removeItem("token")
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },

    setRefresh: async (refresh) => {
        try {
            await AsyncStorage.setItem("refresh", refresh)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },
    getRefresh : async () => {
        try {
            const token = await AsyncStorage.getItem("refresh");
            return token ? token : null
        } catch (error) {
            console.log(error)
            return null
        }
    },

    deleteRefresh: async () => {
        try {
            await AsyncStorage.removeItem("refresh")
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },
}