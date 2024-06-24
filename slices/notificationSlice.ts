import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "@/types/modelsType";

const initialState: {notifications: Notification[]; seen: number} = {
    notifications: [],
    seen: 0
}

// Seen count operation

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload
        },
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.unshift(action.payload)
        },
        markNotificationAsSeen: (state, action: PayloadAction<{index:number}>) => {
            state.notifications[action.payload.index].seen = true
        },

        setCounter: (state, action: PayloadAction<number>) => {
            state.seen = 0
            state.seen = action.payload
        },
        incrementCounter: (state) => {
            state.seen++
        }
    }
})


export const { 
    setNotifications, 
    addNotification ,
    markNotificationAsSeen,
    setCounter,
    incrementCounter
} = notificationSlice.actions

export default notificationSlice.reducer