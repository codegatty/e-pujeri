export function findDiffBetweenDates(date1,date2){
    let moment=require('moment');
    let diffBetweenDates=moment(date1,"YYYY-MM-DD").diff(date2,'days');
    return diffBetweenDates;
}