
import { NotificationListData, NotificationData } from "@/types/modelsType";
import { api } from "./api";


export const getAllNotification = async ():Promise<NotificationListData> => {
    let data:NotificationListData = {
        notifications: [],
        res: false
    }

    try {
        const response = await api.get("notification/for_user/")
        if (response.status) {
            data.notifications = response.data
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)
        return data
    }
}



export const getLatestNotification = async (): Promise<NotificationData> => {
    let data:NotificationData = {
        notification: null,
        res: false
    } 

    try {
        const response = await api.get("notification/latest/")    
        if (response.status === 200) {
            data.notification = response.data
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)
        return data
    }

}
