import * as Notification from 'expo-notifications';
import { fetchTokensFromDatabase } from '../http/pushTokenHttp';
Notification.setNotificationHandler({
    handleNotification:async()=>{
        return{
            shouldShowAlert:true,
            shouldPlaySound:false,
            shouldSetBadge:false
        }
    }
})    
export  async function PushNotificationHandler(name,description){
    const tokens=fetchTokensFromDatabase();
    console.log(tokens);
    await configurePushNotifcation();
    fetch('https://exp.host/--/api/v2/push/send',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to: 'ExponentPushToken[D-dqkwHmiI0sRYm-zO2K2c]',
            title: name,
            body:description
        })
    });

}

async function configurePushNotifcation() {
    const { status } = await Notification.getPermissionsAsync();
    let finalStatus = status;

    if (finalStatus !== 'granted') {
        const { status } = await Notification.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        console.log("permission not granted");
    }
    const pushToken = await Notification.getExpoPushTokenAsync();
    if (Platform.OS == 'android') {
        Notification.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notification.AndroidImportance.DEFAULT
        });
    }
}
