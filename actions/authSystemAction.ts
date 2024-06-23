import { tokenManagement } from "@/stores/tokenManagement";
import { api } from "./api";


export const login = async (body: {email:string; password:string}):Promise<boolean> => {
    let res = false
    try {
        const response = await api.post("token/", body)
        if (response.status === 200) {
            console.log(response.data)
            const refresh = await tokenManagement.setRefresh(response.data.refresh)
            const access = await tokenManagement.setJwt(response.data.access)
            res = (access === refresh) ? true : false
        }
        return res
    } catch (error) {
        console.log(error)
        return false   
    }
}
