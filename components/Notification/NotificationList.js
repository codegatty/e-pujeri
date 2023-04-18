import { useContext } from 'react';
import {FlatList,Text} from 'react-native';

import NotificationItem from './NotificationItem';
import { NotificationViewContext } from '../../store/notificationView-context';
function NotificationList({data}){

    const notificationViewCtx=useContext(NotificationViewContext);
    const mode=notificationViewCtx.mode;

   if(mode==='events'){
        data=data.filter((item)=>item.notficationType==='event')
    }else if(mode==='announcements'){
        data=data.filter((item)=>item.notificationType==='announcement')
    }
    function renderHandler(item){
        return <NotificationItem data={item.item}/>
    }
    return(<>
        <FlatList data={data} renderItem={renderHandler} keyExtractor={(item)=>item.id}/>
        
        </>
    );

}

export default NotificationList;