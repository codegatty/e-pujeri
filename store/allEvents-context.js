import { createContext,useState} from "react";

export const AllEventsContext=createContext({
    events:{},
    setEvents:()=>{}
})

function NotificationContextProvider({children}){
    const [events,setEvents]=useState({});
    function storeEvents(events){
        setEvents(events)
    }
    const values={
        events:events,
        setEvents:storeEvents
    }

    return(
        <AllEventsContext.Provider value={values}>
            {children}
        </AllEventsContext.Provider>
    )
}

export default NotificationContextProvider;
