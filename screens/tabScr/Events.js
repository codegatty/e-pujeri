import { useNavigation } from '@react-navigation/native';
import { useEffect, useContext, useState } from 'react';

import EventsList from '../../components/Events/EventsList';
import { EventContext } from '../../store/events-context';
import { fetchEvents } from '../../util/http/eventHttp';
import ErrorOverlay from '../../components/ui/ErrorOverlay';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

function Events(){
    const eventCtx=useContext(EventContext);
    const Navigation=useNavigation();

    const [error,setError]=useState(false);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        async function eventFetchHandler(){
            setLoading(true)
            try{
                const allEvents=await fetchEvents();
                eventCtx.storeEvents(allEvents);
                
            }catch(e){
                setError(true);
            }
            setLoading(false);
        }
        eventFetchHandler();

    },[])

    function errorLayoutHandler(){
        Navigation.navigate('AdminPanelBottomTab');        
    }

    if(error){
        return <ErrorOverlay message="Could not fetch data from database !" onPress={errorLayoutHandler}/>
    }

    if(loading){
        return <LoadingOverlay/>
    }
    
    return (
        <EventsList dataSource={eventCtx.events}/>
    );
}

export default Events;