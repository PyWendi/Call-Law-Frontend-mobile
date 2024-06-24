import { tokenManagement } from "@/stores/tokenManagement";
import { api } from "./api";
import { Refresh, Payload } from "@/types/customTokenType";


async function setDataToken (data:Payload): Promise<boolean> {
    const refresh = await tokenManagement.setRefresh(data.refresh)
    const access = await tokenManagement.setJwt(data.access)
    return (access === refresh) ? true : false
}

export const login = async (body: {email:string; password:string}):Promise<boolean> => {
    let res = false
    try {
        const response = await api.post("token/", body)
        if (response.status === 200) {
            console.log(response.data," Login action")
            res = await setDataToken(response.data)
        }
        return res
    } catch (error) {
        console.log(error)
        return false   
    }
}

export const refreshToken = async (): Promise<boolean> => {
    let res = false

    try {
        const refresh:Refresh = {refresh: await tokenManagement.getRefresh()}
        const response = await api.post("token/refresh/", refresh)
        if (response.status === 200) {
            console.log(response.data, "Refresh token action.")
            res = await setDataToken(response.data)
        }

        return res
    } catch (error) {
        console.log(error)
        return res
    }
} 



export const logout = async ():Promise<void> => {
    await tokenManagement.deleteJwt()
    await tokenManagement.deleteRefresh()
}