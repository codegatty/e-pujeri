import { useContext, useState } from 'react';
import { FlatList, Text } from 'react-native';

import NotificationItem from './NotificationItem';
import { NotificationViewContext } from '../../store/notificationView-context';
import { filterContext } from '../../store/userFilter-context';
import { filterEvent } from '../../util/others/filterEvent';
import { AllEventsContext } from '../../store/allEvents-context';
import { findDiffBetweenDates } from '../../util/others/findDiffBetweenDates';
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
        }
        return data
    }
    //filtering the data
    function renderHandler(item) {
        return <NotificationItem data={item.item} />
    }
    return (<>
        <FlatList data={data} renderItem={renderHandler} keyExtractor={(item) => item.id} />

    </>
    );

}

export default NotificationList;