export function dateToString(date){
    if(date==''){
        return ' ';
    }else{
    const dateDate=new Date(date);
    const stringDate=dateDate.getDate()+'-'+(dateDate.getMonth()+1)+'-'+dateDate.getFullYear();
    return stringDate;
    }
}