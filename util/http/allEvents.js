//this will load all events for notification panel for user
import axios from "axios";

import { findDiffBetweenDates } from "../others/findDiffBetweenDates";

const url="https://epujeri-d5ced-default-rtdb.firebaseio.com/";

export async function fetchAllEvents(){
    let notification=[];

    let moment=require('moment');
    //let currentDate=moment([]);//current date
    const currentDate=new Date()
    const announcementResponse=await axios.get(url+'/announcement.json');
    const eventResponse=await axios.get(url+'/events.json');

    function remainingDaysFinder(data) {

        if (data.type === 'ame' || data.type === 'soothaka') {
            const dateInFormat = new Date(data.date)
            const resultDate = dateInFormat;
            let test=findDiffBetweenDates(resultDate,currentDate)
            
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
            daysAfterAnnounced:findDiffBetweenDates(announcementResponse.data[key].publishedDate,currentDate),
            notificationType:'announcement'
        }
        let pubDate=moment(announcement.publishedDate);
        let diffBetweenDates=findDiffBetweenDates(pubDate,currentDate);
        if(diffBetweenDates>-5){
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
            remaingDays:((remainingDaysFinder(eventResponse.data[key])[0]))

            
        }
        let pubDate=event.date;
        let diffBetweenDates=findDiffBetweenDates(pubDate,currentDate);
        if(diffBetweenDates>=-2){
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

