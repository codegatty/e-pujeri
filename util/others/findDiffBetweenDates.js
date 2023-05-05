import { diff } from 'react-native-reanimated';

export function findDiffBetweenDates(date1,date2){
    let moment=require('moment');
    /*let diffBetweenDates=moment(date1,"YYYY-MM-DD").diff(date2,'days');
    return diffBetweenDates;*/
    //date1=new Date(date1)
    //let diffBetweenDates=moment(date1,"YYYY-MM-DD").diff(date2,'days');

    date1=new Date(date1)
    let day1=parseInt(date1.getDate());
    let month1=parseInt(date1.getMonth())
    let year1=parseInt(date1.getFullYear())

    date2=new Date(date2)
    let day2=parseInt(date2.getDate());
    let month2=parseInt(date2.getMonth())
    let year2=parseInt(date2.getFullYear())



    var a = moment([year1, month1,day1]);
    var b = moment([year2,month2, day2]);
    let diffb=a.diff(b, 'days') // 1
    
    return diffb
    
}