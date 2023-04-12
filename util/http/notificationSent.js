import axios from 'axios';

import { findDiffBetweenDates } from '../others/findDiffBetweenDates';

const URL="https://epujeri-d5ced-default-rtdb.firebaseio.com/";
const ID=`-NO2RUVWzN3EZHLrjvA-`;//id of child of sentNotification table
export async function updateNotificationSentTrue(){

    data=await fetchIsNotified();

    date=new Date(data.currentDate)
    const diff=findDiffBetweenDates(new Date(),date);
    if(diff>0){
        data={isNotified:false,currentDate:new Date()}
        await axios.put(URL+`/notificationSent/${ID}.json`,data);
    }else{
        data={isNotified:true,currentDate:new Date()}
        await axios.put(URL+`/notificationSent/${ID}.json`,data);
    }
}


export async function fetchIsNotified(){
    const data=await axios.get(URL+`/notificationSent/${ID}.json`)
    return data.data
}

/*async function create(){

    const data= await axios.post(URL+'/notificationSent.json',{isNotified:false,currentDate:new Date()})
}*/

//if you changed database you have to create table and insert id of that atttribute to ID variable