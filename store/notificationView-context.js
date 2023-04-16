import {createContext,useState} from 'react';

export const NotificationViewContext=createContext({
    mode:'',
    selectMode:(mode)=>{}
})

function NotificationViewProvider({children}){
    const [mode,setMode]=useState('all');
    function selectMode(viewMode){
        setMode(viewMode);
    }

    const values={
        mode:mode,
        selectMode:selectMode
    }
    return(
        <NotificationViewContext.Provider value={values}> 
            {children}
        </NotificationViewContext.Provider>
    )
}

export default NotificationViewProvider;