import * as Notification from 'expo-notifications';
import { PushNotificationHandler } from '../others/pNotification';
import axios from "axios";

const URL="https://epujeri-d5ced-default-rtdb.firebaseio.com/";


export async function addAnnouncement(annData){
    const response=await axios.post(URL+"/announcement.json",annData);
    //await sendPushNotificationHandler(annData.name,annData.description);
    await PushNotificationHandler(annData.name,annData.description)
    return response.data.name;
}

export async function updateAnnouncement(id,annData){
    await axios.put(URL+`/announcement/${id}.json`,annData);
}

export async function fetchAnnouncements(){
    const response=await axios.get(URL+'/announcement.json');
    let announcements=[];
    for(let key in response.data){
    const announcement={
        id:key,
        name:response.data[key].name,
        description:response.data[key].description,
        publishedDate:response.data[key].publishedDate
    }
    announcements.push(announcement);
    }
    return announcements;
}

export async function deleteAnnouncement(id){
    await axios.delete(URL+`/announcement/${id}.json`,id);
}


//push notification
async function sendPushNotificationHandler(name,description){
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
            importance: Notification.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250]
        });
    }
}
