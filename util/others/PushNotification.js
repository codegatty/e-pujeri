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

function scheduleNotification1(title,body,date){


    let eDate = new Date(date);
    //Add 10 seconds to the current date to test it.
    eDate.setSeconds(eDate.getSeconds() + 10)
Notification.scheduleNotificationAsync({
  content: {
    title: title,
    body:body
  },
  trigger:{
    date:eDate,
  }
});
}


function scheduleNotification2(title,body,date){
    let eDate = new Date(date);
    //Add 10 seconds to the current date to test it.
    eDate.setSeconds(eDate.getSeconds() + 10)
Notification.scheduleNotificationAsync({
  content: {
    title: title,
    body:body
  },
  trigger:{
    seconds:10,
  }
});
    
}
async function test(){
   //await Notification.cancelAllScheduledNotificationsAsync()
    let val=await Notification.getAllScheduledNotificationsAsync()
    let key
    for (key in val){
        console.log(val[key].identifier,val[key].trigger)
    }
    console.log("-----------");
}
test()

export async function sendPushNotificationHandler() {
    const currentDate = moment([]);
    const allNotification = await fetchAllEvents();
    for( let key in allNotification){
        if(allNotification[key].notficationType=='event'){
            let diff=findDiffBetweenDates(allNotification[key].date,currentDate);
            if(diff<=1){
                scheduleNotification2(allNotification[key].name,allNotification[key].description,allNotification[key].date)
                scheduleNotification1(allNotification[key].name,allNotification[key].description,allNotification[key].date)
            }
        }
    }

    //scheduleNotification();
}


