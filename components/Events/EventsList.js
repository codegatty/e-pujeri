import { useNavigation } from '@react-navigation/native';
import {FlatList,View} from 'react-native';

import { dateToString } from '../../util/others/dateToString';
import { findDiffBetweenDates } from '../../util/others/findDiffBetweenDates';

import EventItem from "./EventItem";
function EventsList({dataSource}){

    const Navigation=useNavigation();
    let moment=require('moment');

    function onPressHandler(eventData){
        /*eventDataInString is used to supprss the error while routing data using route prop of navigation
        date must be converted to strin otherwise it shows error while routing data using route prop of navigation*/
        const eventDataInString={
            event:eventData.event,
            about:eventData.about,
            date:dateToString(eventData.date),
            id:eventData.id,
            isYearlyEvent:eventData.isYearlyEvent,
            type:eventData.type,
            publishedDate:dateToString(eventData.publishedDate),
            isNotified:(typeof(eventData.isNotified)==="boolean")?eventData.isNotified.toString():eventData.isNotified,
            currentDays:findDiffBetweenDates(eventData.date,moment([])),
            totalDays:eventData.days
        };
        console.log(typeof(eventData.isNotified))
        Navigation.navigate('EventSummery',{eventData:eventDataInString})
    }
    function renderHandler(itemData){
    return <EventItem data={itemData.item} onPress={onPressHandler.bind(this,itemData.item)}/>
    }
    return(
        <FlatList data={dataSource} renderItem={renderHandler} keyExtractor={(item)=>item.id}/>
        
    );
}

export default EventsList;