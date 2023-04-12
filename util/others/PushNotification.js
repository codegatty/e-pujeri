//Push notification for events
import { Platform } from 'react-native';
import * as Notification from 'expo-notifications';
import { fetchAllEvents } from '../http/allEvents';
import { findDiffBetweenDates } from './findDiffBetweenDates';
import moment from 'moment';

import { updateIsNotified } from '../http/allEvents';
import { event } from 'react-native-reanimated';


Notification.setNotificationHandler({
    handleNotification:async ()=>{
        return{
            shouldPlaySound:false,
            shouldSetBadge:false,
            shouldShowAlert:true
        }
    }
});

function scheduleNotification(title,body,date){
    /*const trigger=new Date("12/03/2023")
    trigger.setMinutes(1);
    trigger.setSeconds(1);
    Notification.scheduleNotificationAsync({
        content:{title:title,
        body:body
    },
     trigger,
    });*/

    const trigger = new Date(Date.now() + 60 * 60 * 1000);
trigger.setMinutes(0);
trigger.setSeconds(0);

Notification.scheduleNotificationAsync({
  content: {
    title: 'Happy new hour!',
  },
  trigger,
});
}

export async function sendPushNotificationHandler() {
    const currentDate = moment([]);
    const allNotification = await fetchAllEvents();
    for( let key in allNotification){
        if(allNotification[key].notficationType=='event'){
            let diff=findDiffBetweenDates(allNotification[key].date,currentDate);
            //if(diff==1){
                scheduleNotification(allNotification[key].name,allNotification[key].description,allNotification[key].date)
            //}
        }
    }

    //scheduleNotification();
}


