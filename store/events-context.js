import {useReducer,createContext} from 'react';

export const EventContext=createContext({
    events:[],
    storeEvents:(events)=>{},
    addEvent:({name,about,date,yearly,Type,publishedDate})=>{},
    deleteEvent:(id)=>{},
    updateEvent:(id,{name,about,date,yearly,Type})=>{}
});


function eventReducer(state,action){
    switch(action.type){
        case 'ADD':
            return [action.payload,...state];
        case 'UPDATE':
            const updatableEventIndex=state.findIndex((event)=>event.id===action.payload.id);
            const updatableEvent=state[updatableEventIndex];
            const updatedEvent={...updatableEvent,...action.payload.eventData};
            const updatedEvents=[...state];
            updatedEvents[updatableEventIndex]=updatedEvent;
            return updatedEvents;
            
        case 'DELETE':
            const newState=state.filter((event)=>event.id!==action.payload);
            return newState;
        case 'STORE':
            const inverted=action.payload.reverse();   
            return inverted;
        default:
            return state;
    }
}

function EventContextProvider({children}){
    const [eventState,dispatch]=useReducer(eventReducer,[])

    function addEvent(event){
        dispatch({type:'ADD',payload:event})
    }

    function updateEvent(id,event){
        dispatch({type:'UPDATE',payload:{id:id,eventData:event}})
    }

    function deleteEvent(id){
        dispatch({type:'DELETE',payload:id})
    }

    function storeEvents(events){
        dispatch({type:'STORE',payload:events})
    }

    const values={
        events:eventState,
        addEvent:addEvent,
        updateEvent:updateEvent,
        deleteEvent:deleteEvent,
        storeEvents:storeEvents
    }
    return(
    <EventContext.Provider value={values}>
        {children}
    </EventContext.Provider>);
}

export default EventContextProvider;