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
        markNotificationAsSeen: (state, action: PayloadAction<number>) => {
            if(!state.notifications[action.payload].seen) {
                state.notifications[action.payload].seen = true
                console.log("decremented")
            }
        },

        markAllNotificationAsSeen: (state) => {
            for (let i=0; i < state.notifications.length; i++){
                state.notifications[i].seen = true
            }
            state.seen = 0
        },

        setCounter: (state, action: PayloadAction<number>) => {
            state.seen = 0
            state.seen = action.payload
        },
        incrementCounter: (state) => {
            state.seen++
        },
        decrementCounter: (state) => {
            state.seen--
        }
    }
})


export const { 
    setNotifications, 
    addNotification ,
    markNotificationAsSeen,
    markAllNotificationAsSeen,
    setCounter,
    incrementCounter,
    decrementCounter
} = notificationSlice.actions

export default notificationSlice.reducer