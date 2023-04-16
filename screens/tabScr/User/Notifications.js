import { useEffect,useContext,useState} from 'react';

import { AllEventsContext } from '../../../store/allEvents-context';//this is the notification context

import { fetchAllEvents } from '../../../util/http/allEvents';
import NotificationList from '../../../components/Notification/NotificationList';
import {updateNotificationSentTrue} from '../../../util/http/notificationSent';
import ErrorOverlay from '../../../components/ui/ErrorOverlay';
import LoadingOverlay from '../../../components/ui/LoadingOverlay';

function Notification(){
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(false)

    const notificationCtx=useContext(AllEventsContext);
    
    useEffect(()=>{
        
        async function fetchNotification(){
            setLoading(true)
            try{
            const allNotification=await fetchAllEvents();
            notificationCtx.setEvents(allNotification);
            await updateNotificationSentTrue();
            }catch(e){
                setError(true)
            }
            setLoading(false)
        }
        fetchNotification();
    },[])

    if(error){
        return <ErrorOverlay message="Could not fetch data from database !" onPress={errorLayoutHandler}/>
    }

    if(loading){
        return <LoadingOverlay/>
    }
    return(
        <NotificationList data={notificationCtx.events}/>
    );
}
export default Notification;