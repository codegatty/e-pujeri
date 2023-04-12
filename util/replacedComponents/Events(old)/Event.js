import { useState, useContext } from "react";

import EventForm from "./EventForm";
import LoadingOverlay from '../ui/LoadingOverlay';
import ErrorOverlay from '../ui/ErrorOverlay';
import { addEvent,fetchEvents,updateEvent } from "../../util/http/eventHttp";
import { EventContext } from "../../store/events-context";

function Event({ route, navigation }) {

    const eventCtx = useContext(EventContext);

    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);

    const selectedEventId = route.params?.id;
    const isEditing = !!selectedEventId;
    const selectedEvent= selectedEventId && eventCtx.events.find((event)=>event.id===selectedEventId)

    async function eventAddHandler(eventDetails) {
        setLoading(true);
        if (isEditing) {
            try{
                await updateEvent(selectedEventId,eventDetails);
                eventCtx.updateEvent(selectedEventId,eventDetails);
              navigation.navigate('Announcement')
            }catch(e){
                setError(true)
            }
        } else {
            try {
                const id = await addEvent(eventDetails);//this function stores event in database
                eventCtx.addEvent({ id: id, ...eventDetails })
                navigation.navigate('Events');
            } catch (e) {
                setError(true);
            }
        }
        setLoading(false);
    }

    async function errorGoBackButtonHandler(){
        const events=await fetchEvents();
        navigation.goBack(); 
    }

    if (isLoading) {
        return <LoadingOverlay />
    }
    if (isError) {
        return <ErrorOverlay message='Issue occured while storing' onPress={errorGoBackButtonHandler} />
    }

    return (
        <EventForm onAddEvent={eventAddHandler} 
        defaultValue={selectedEvent}  
        submitButtonTitle={isEditing?'Update Event':'Add Event'}/>
    );
}

export default Event; 