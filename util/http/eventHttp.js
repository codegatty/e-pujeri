import axios from "axios";
import { addAnnouncement } from "./announcementHttp";

const URL="https://epujeri-d5ced-default-rtdb.firebaseio.com/";

export async function addEvent(eventDetails){
    
    const annData={
        name:eventDetails.event,
        description:eventDetails.about,
        publishedDate:eventDetails.publishedDate
    };
    const responseEvent=await axios.post(URL+'/events.json',{...eventDetails,isNotified:false});
    //anouncement 
    const responseAnn=await addAnnouncement(annData);
    //anouncement
    const responseIds=[responseEvent.data.name,responseAnn]
    //console.log(responseIds)
    return responseEvent.data.name;
    
}

export async function fetchEvents(){
    let events=[]
    const response=await axios.get(URL+'/events.json');
    for(const key in response.data){
       const event={
        id:key,
        event:response.data[key].event,
        about:response.data[key].about,
        date:response.data[key].date,
        isYearlyEvent:response.data[key].isYearlyEvent,
        type:response.data[key].type,
        publishedDate:response.data[key].publishedDate,
        isNotified:response.data[key].isNotified,
        days:response.data[key].days
       }
       events.push(event) 
    }
    return events;
}

export async function updateEvent(id,eventDetails){
    await axios.put(URL+`/events/${id}.json`,eventDetails)
    
}

export async function deleteEvent(id){
    await axios.delete(URL+`/events/${id}.json`,)
}
