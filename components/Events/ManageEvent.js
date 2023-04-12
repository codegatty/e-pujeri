import { useContext, useState } from "react";

import EventForm from "./EventForm";
import { addEvent, updateEvent } from '../../util/http/eventHttp';
import { EventContext } from '../../store/events-context';
import ErrorOverlay from "../ui/ErrorOverlay";
import LoadingOverlay from "../ui/LoadingOverlay";
import { AnnouncementContext } from "../../store/announcements-context";

function ManageEvent({ route, navigation }) {

    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const selectedEventId = route.params?.eventId;
    const isEditing = !!selectedEventId;
    const eventCtx = useContext(EventContext);
    const annCtx = useContext(AnnouncementContext);
    const selectedEvent = isEditing && eventCtx.events.find((event) => event.id === selectedEventId);

    async function onSubmitHandler(eventData) {
        setLoading(true);
        if (isEditing) {
            try {

                await updateEvent(selectedEventId, eventData);
                eventCtx.updateEvent(selectedEventId, eventData);
                navigation.navigate('Events');
            } catch (e) {
                setLoading(false);
                setError(true);
            }
        } else {
            try {
                const annData = {
                    name: eventData.event,
                    description: eventData.about,
                    publishDate: eventData.publishedDate
                };
                const responseIds = await addEvent(eventData);
                eventCtx.addEvent({ ...eventData, id: responseIds[0], isNotified: false });
                //announcement creating from event
                annCtx.addAnnouncement({...annData,id:responseIds[1]});
                //annoucement
                navigation.navigate('Events');
            } catch (e) {
                setLoading(false);
                setError(true);
            }
            setLoading(false);
        }
    }

    if (isLoading) {
        return <LoadingOverlay />
    }
    if (isError) {
        return <ErrorOverlay />
    }
    return (
        <EventForm
            onSubmit={onSubmitHandler}
            submitButtonTitle={isEditing ? 'Update Event' : 'Add Event'}
            defaultValue={isEditing && selectedEvent} />
    )
}

export default ManageEvent;