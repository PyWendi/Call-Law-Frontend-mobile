import HeaderSectionComponent from "@/components/HeaderSectionComponent"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import CustomButtonWithIcon from "@/components/ButtonComponent"
import { useState } from "react"
import NotificationContentComponent from "@/components/notification/ContentComponent"
import NoResultFound from "@/components/NoResultFound"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/stores/store"
import { useRouter } from "expo-router"

import { markAsSeen, markAllAsSeen } from "@/actions/notificationAction"
import { markNotificationAsSeen, markAllNotificationAsSeen, decrementCounter } from "@/slices/notificationSlice"
import { Toast } from "@ant-design/react-native"

export default function NotificationScreen() {
    const dispatch:AppDispatch = useDispatch()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const notificationData = useSelector((state:RootState) => state.notifications.notifications)

    const markAll = async () => {
        setLoading(true)
        const response = await markAllAsSeen()
        if(response) {
            await dispatch(markAllNotificationAsSeen())
        } else {
            Toast.fail("An error occured when marking all the notifications, pease check your network activity and try again.")
        }
        setLoading(false)
    }

    const handlePress = async (index:number) => {
        const response = await markAsSeen(notificationData[index].id)
        if(response){
            await dispatch(markNotificationAsSeen(index))
            await dispatch(decrementCounter())
            router.replace("/home/client/appointment/")
        } else {
            Toast.fail("An error occured when performing the action, check your network and try again.")
        }
    }

    return (
        <>
            <View style={style.container}>
                {/* Header of the page */}
                <View>
                    <HeaderSectionComponent
                    title="Notifications"
                    />
                </View>

                {(notificationData.length != 0) && (
                    <View style={{
                        marginTop: 10,
                        paddingHorizontal: 10
                    }}>
                        <CustomButtonWithIcon
                        type="outlined"
                        loading={loading}
                        text="Mark all as seen"
                        buttonClicked={markAll}
                        />
                    </View>
                )}

                {/* Button to mark all as read */}
                {(notificationData.length != 0) ? (
                    <ScrollView
                    automaticallyAdjustContentInsets={true}
                    showsVerticalScrollIndicator={false}
                    style={{
                        marginTop: 10
                    }}
                    >
                        {notificationData.map((notif, index) => (
                            <TouchableOpacity key={index}
                            onPress={() => handlePress(index)}
                            >
                                <View style={{
                                    width: "90%",
                                    margin: "auto",
                                    marginBottom: 10,
                                    backgroundColor: (notif.seen) ? "white" : "#E5F2F9"
                                }}
                                >
                                    <NotificationContentComponent
                                    index={index}
                                    notif={notif}
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                ):
                (
                    <View>
                        <NoResultFound
                        text="There are no notification yet..."
                        />

                    </View>
                )}

                

            </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        // paddingHorizontal: 10,
        flex: 1,
        height: 10
    },
})