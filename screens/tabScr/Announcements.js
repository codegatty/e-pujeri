import { useEffect,useContext} from 'react';

import {fetchAnnouncements} from '../../util/http/announcementHttp';
import AnnouncementList from '../../components/Announcement/AnnouncementList';
import { AnnouncementContext } from '../../store/announcements-context';
function Announcements(){
    const announcementCtx=useContext(AnnouncementContext)
    useEffect(()=>{
        announcementFetchHandler();
        async function announcementFetchHandler(){
            const allAnnouncements=await fetchAnnouncements();
            announcementCtx.storeAnnouncements(allAnnouncements);
        }
    },[]);
    
    return(
        <AnnouncementList dataSource={announcementCtx.announcement}/>
    )
}

export default Announcements;