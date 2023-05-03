import { useContext } from 'react';
import { FlatList, Text,StyleSheet,View, ViewBase } from 'react-native';

import NotificationItem from './NotificationItem';
import { NotificationViewContext } from '../../store/notificationView-context';
import { filterContext } from '../../store/userFilter-context';

import { AllEventsContext } from '../../store/allEvents-context';

function NotificationList({ data }) {
    const EventsCtx = useContext(AllEventsContext);
    const notificationViewCtx = useContext(NotificationViewContext);
    const userFilterCtx = useContext(filterContext);
    const mode = notificationViewCtx.mode;
    //Filtering the data
    if (mode === 'events') {
        data =  filterHandler(data)
        data = data.filter((item) => item.notificationType === 'event')
    } else if (mode === 'announcements') {
        data = filterHandler(data)
        data = data.filter((item) => item.notificationType === 'announcement')
    }else if(mode==='all'){
        data=filterHandler(data)
    }

    function filterHandler(data) {
        const op = userFilterCtx.option
        if (mode === 'events') {
            switch (op) {
                case 0: data = EventsCtx.events
                    break;
                case 1: data = data.filter((ele) => ele.remaingDays === 0)
                    break;
                case 2: data = data.filter((ele) => ele.remaingDays === 1)
                    break;
                case 3: data = data.filter((ele) => ele.remaingDays === -1)
                    break;
                case 4: data = data.filter((ele) => ele.remaingDays < 0)
                    break;
            }
        } else if (mode === 'announcements') {
            
            switch (op) {
                case 0: data = EventsCtx.events
                    break;
                case 1: data = data.filter((ele) => ele.daysAfterAnnounced === 0)
                    break;
                case 2: data = data.filter((ele) => ele.daysAfterAnnounced === 1)
                    break;
                case 3: data = data.filter((ele) => ele.daysAfterAnnounced === -1)
                    break;
                case 4: data = data.filter((ele) => ele.daysAfterAnnounced <0)
                    break;
            }
        }else if(mode==='all'){
            switch (op) {
                case 0: data = EventsCtx.events
                    break;
                case 1: data = data.filter((ele) => ele.notificationType === 'event'?ele.remaingDays === 0:ele.daysAfterAnnounced === 0)
                    break;
                case 2: data = data.filter((ele) => ele.notificationType === 'event'?ele.remaingDays === 1:ele.daysAfterAnnounced === 1)
                    break;
                case 3: data = data.filter((ele) => ele.notificationType === 'event'?ele.remaingDays === -1:ele.daysAfterAnnounced === -1)
                    break;
                case 4: data = data.filter((ele) => ele.notificationType === 'event'?ele.remaingDays <0:ele.daysAfterAnnounced <0)
                    break;
            }
        }
        return data
    }
    //filtering the data
    function renderHandler(item) {
        return <NotificationItem data={item.item} />
    }
    
    return (<>
        {data.length>0?
        <FlatList data={data} renderItem={renderHandler} keyExtractor={(item) => item.id}/>: 
        <View style={styles.messageContainer}><Text style={styles.message}>No Data Found...!</Text></View>}
    </>
    );

}

export default NotificationList;

const styles=StyleSheet.create({
    messageContainer:{
        flex:1,
    },
    message:{
        marginTop:300,
        textAlign:'center',
        letterSpacing:2,
        color:'grey',
        fontWeight:'500',
        fontSize:15
    }
})