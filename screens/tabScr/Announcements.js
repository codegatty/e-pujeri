import { useEffect,useContext,useState} from 'react';

import {fetchAnnouncements} from '../../util/http/announcementHttp';
import AnnouncementList from '../../components/Announcement/AnnouncementList';
import { AnnouncementContext } from '../../store/announcements-context';
import ErrorOverlay from '../../components/ui/ErrorOverlay';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

function Announcements(){
    const [error,setError]=useState(false)
    const[loading,setLoading]=useState(false)
    const announcementCtx=useContext(AnnouncementContext)
    useEffect(()=>{
        
        async function announcementFetchHandler(){
            setLoading(true)
            try{
            const allAnnouncements=await fetchAnnouncements();
            announcementCtx.storeAnnouncements(allAnnouncements);
            }catch(e){
                setError(true);
            }
            setLoading(false);
        }
        announcementFetchHandler();
    },[]);

    function errorLayoutHandler(){
        Navigation.navigate('AdminPanelBottomTab');        
    }

    if(error){
        return <ErrorOverlay message="Could not fetch data from database !" onPress={errorLayoutHandler}/>
    }

    if(loading){
        return <LoadingOverlay/>
    }
    
    return(
        <AnnouncementList dataSource={announcementCtx.announcement}/>
    )
}

export default Announcements;