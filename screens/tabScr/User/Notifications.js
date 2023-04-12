import { useEffect,useContext } from 'react';
import {Text} from 'react-native';

import { AllEventsContext } from '../../../store/allEvents-context';//this is the notification context

import { fetchAllEvents } from '../../../util/http/allEvents';
import NotificationList from '../../../components/Notification/NotificationList';
import {updateNotificationSentTrue} from '../../../util/http/notificationSent';


function Notification(){
    const notificationCtx=useContext(AllEventsContext);
    useEffect(()=>{
        fetchNotification();
        async function fetchNotification(){
            const allNotification=await fetchAllEvents();
            notificationCtx.setEvents(allNotification);
            await updateNotificationSentTrue();
        }
    },[])
    return(
        <NotificationList data={notificationCtx.events}/>
    );
}
export default Notification;