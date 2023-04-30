import { createContext,useState} from "react";

export const AllEventsContext=createContext({
    events:[],
    setEvents:()=>{},
})
//event holds all data without applying any filtering,at the same time filtered event contains filtered data

function NotificationContextProvider({children}){
    const [events,setEvents]=useState([]);
    const [filteredEvents,setFilteredEvent]=useState({})

    function storeEvents(events){
        setEvents(events)
    }

    const values={
        events:events,
        setEvents:storeEvents,

    }

    return(
        <AllEventsContext.Provider value={values}>
            {children}
        </AllEventsContext.Provider>
    )
}

export default NotificationContextProvider;
