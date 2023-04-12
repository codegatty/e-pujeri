import { createContext,useReducer } from "react";

export const AnnouncementContext=createContext({
    announcement:[],
    addAnnouncement:(annoucement)=>{},
    updateAnnouncement:(id,announcement)=>{},
    deleteAnnouncement:(id)=>{},
    storeAnnouncements:(anouncements)=>{}
})

function announcementReducer(state,action){
    switch(action.type){
        case 'ADD':
            return [...state,action.payload];
        case 'UPDATE':
            const updatableAnnIndex=state.findIndex((ann)=>ann.id===action.payload.id);
            const updatableAnn=state[updatableAnnIndex];
            const updatedAnn={...updatableAnn,...action.payload.annData};
            const updatedAnns=[...state];
            updatedAnns[updatableAnnIndex]=updatedAnn;
            return updatedAnns;
        case 'STORE':
            const inverted=action.payload.reverse();
            return inverted;
        case 'DELETE':
            const newState=state.filter((ann)=>ann.id!==action.payload);
            return newState;
    }
}


function AnnouncementContextProvider({children}){

    const[announcementState,dispatch]=useReducer(announcementReducer,[])

    function addAnnouncement(annData){
        dispatch({type:'ADD',payload:annData})
    }

    function updateAnnouncement(id,annData){
        dispatch({type:'UPDATE',payload:{id:id,annData:annData}})
    }

    function deleteAnnouncement(id){
        dispatch({type:'DELETE',payload:id})
    }

    function storeAnnouncements(annDatas){
        dispatch({type:'STORE',payload:annDatas})
    }

    const values={
        announcement:announcementState,
        addAnnouncement:addAnnouncement,
        updateAnnouncement:updateAnnouncement,
        deleteAnnouncement:deleteAnnouncement,
        storeAnnouncements:storeAnnouncements
    }

    return(
        <AnnouncementContext.Provider value={values}>
            {children}
        </AnnouncementContext.Provider>
    )
}

export default AnnouncementContextProvider;

