import { useState,createContext } from "react";


export const ShowAllEventContext=createContext({
    shouldShow:false,
    toShouldShow:(show)=>{}
})

function ShowAllEventProvider({children}){
    const [shouldShow,setShouldShow]=useState(false);
    function toShouldShow(show){
        setShouldShow(show)
    }
    const values={
        shouldShow:shouldShow,
        toShouldShow:toShouldShow,
    }

    return(
        <ShowAllEventContext.Provider value={values}>
            {children}
        </ShowAllEventContext.Provider>
    )
}

export default ShowAllEventProvider;