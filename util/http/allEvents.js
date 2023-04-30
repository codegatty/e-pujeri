//this will load all events for notification panel for user
import axios from "axios";

import { findDiffBetweenDates } from "../others/findDiffBetweenDates";

const url="https://epujeri-d5ced-default-rtdb.firebaseio.com/";

export async function fetchAllEvents(){
    let notification=[];

    let moment=require('moment');
    let currentDate=moment([]);//current date
    
    const announcementResponse=await axios.get(url+'/announcement.json');
    const eventResponse=await axios.get(url+'/events.json');

    function remainingDaysFinder(data) {

        if (data.type === 'ame' || data.type === 'soothaka') {
            const dateInFormat = new Date(data.date)
            const resultDate = moment(dateInFormat, "DD-MM-YYYY").add(16, 'days');
            return [findDiffBetweenDates(resultDate,currentDate),resultDate]
        }else{
            return [findDiffBetweenDates(data.date,currentDate),data.date]
        }
    }

    
    for(let key in announcementResponse.data){
        const announcement={
            id:key,
            name:announcementResponse.data[key].name,
            description:announcementResponse.data[key].description,
            publishedDate:announcementResponse.data[key].publishedDate,
            notificationType:'announcement'
        }
        let pubDate=moment(announcement.publishedDate);
        let diffBetweenDates=findDiffBetweenDates(currentDate,pubDate);
        if(diffBetweenDates<62){
            notification.push(announcement);
        }
    }
    for(let key in eventResponse.data){
        const event={
            id:key,
            name:eventResponse.data[key].event,
            description:eventResponse.data[key].about,
            date:new Date(remainingDaysFinder(eventResponse.data[key])[1]),
            isYearlyEvent:eventResponse.data[key].isYearlyEvent,
            type:eventResponse.data[key].type,
            publishedDate:eventResponse.data[key].publishedDate,
            notificationType:'event',
            isNotified:eventResponse.data[key].isNotified,
            remaingDays:remainingDaysFinder(eventResponse.data[key])[0]

            
        }
        let pubDate=event.date;
        let diffBetweenDates=findDiffBetweenDates(pubDate,currentDate);
        if(diffBetweenDates>=0){
            notification.push(event);
        }
    }
    return notification;
}

export async function updateIsNotified(notification){
    const id=notification.id;
    const data={
        date:notification.date,
        about:notification.description,
        isNotified:true,
        isYearlyEvent:notification.isYearlyEvent,
        event:notification.name,
        notficationType:notification.notficationType,
        publishedDate:notification.publishedDate,
        type:notification.type
    }
    await axios.put(url+`/events/${id}.json`,data);
}

