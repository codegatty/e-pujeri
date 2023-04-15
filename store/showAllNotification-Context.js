import {createContext,useState} from 'react'

export const ShowAllNotifcationContext=createContext({
    shouldShow:false,
    toShouldShow:(show)=>{}
})

function ShowAllNoificationProvider({children}){
    const [shouldShow,setShouldShow]=useState(false)
    function toShouldShow(show){
        setShouldShow(show)
    }

    const values={
        shouldShow:shouldShow,
        toShouldShow:toShouldShow
    }
    return(
        <ShowAllNotifcationContext.Provider value={values}>
            {children}
        </ShowAllNotifcationContext.Provider>
    )

}

export default ShowAllNoificationProvider;