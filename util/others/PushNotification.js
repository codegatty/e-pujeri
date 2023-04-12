//Push notification for events
import { Platform } from 'react-native';
import * as Notification from 'expo-notifications';
import { fetchAllEvents } from '../http/allEvents';
import { findDiffBetweenDates } from './findDiffBetweenDates';
import moment from 'moment';

import { updateIsNotified } from '../http/allEvents';

Notification.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldPlaySound: false,
            shouldSetBadge: false,
            shouldShowAlert: true
        }
    }
})

export async function sendPushNotificationHandler() {
    const currentDate = moment([]);
    const allNotification = await fetchAllEvents();
    for (let key in allNotification) {
        
        let eventDate = allNotification[key].date;
        let diffBetweenDate = (findDiffBetweenDates(eventDate, currentDate));
        if (allNotification[key].notficationType === "event") {
            if (diffBetweenDate == 0 && allNotification[key].isNotified == false) {
                //this function is useded to
                pushNotificationSender(allNotification[key].name,allNotification[key].description,diffBetweenDate)
               await updateIsNotified(allNotification[key]);//update the is notified to true 
            }
        }
    }
}

export async function configurePushNotifcation() {
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

function pushNotificationSender(eventName,description,differnce){
    fetch('https://exp.host/--/api/v2/push/send',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to: 'ExponentPushToken[D-dqkwHmiI0sRYm-zO2K2c]',
            title: differnce==0?eventName+`(${differnce} to go)`:eventName,
            body: description
        })
    });
}