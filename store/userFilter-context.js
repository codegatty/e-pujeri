import { Children, createContext,useState } from "react";

export const filterContext=createContext({
    option:0,
    setOption:(option)=>{}
})

export function UserFilterContextProvider({children}){
    const [option,settingOption]=useState(1);
    function setOption(option){
        settingOption(option);
    }
    const values={
        option:option,
        setOption:setOption
    }
    return(
        <filterContext.Provider value={values}>
            {children}
        </filterContext.Provider>
    )
}

export default UserFilterContextProvider