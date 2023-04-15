import { useContext } from 'react';
import {FlatList} from 'react-native';

import AnnouncementItem from '../Announcement/AnnouncementItem';
import {ShowAllNotifcationContext} from '../../store/showAllNotification-Context';
import { findDiffBetweenDates } from '../../util/others/findDiffBetweenDates';

function AnnouncementList({dataSource}){

    const AllNotificationCtx=useContext(ShowAllNotifcationContext);

    if(AllNotificationCtx.shouldShow==false){
        dataSource=dataSource.filter((items)=>{
            let diff=findDiffBetweenDates(items.publishedDate,new Date())
            return diff>0
        })
    }

    function onPressHandler(annData){
        
    }
    function renderHandler(dataItem){
        return <AnnouncementItem data={dataItem.item} onPress={onPressHandler}/>
    }
    return(
        <FlatList data={dataSource} renderItem={renderHandler} keyExtractor={(item)=>item.id}/>
    );
}

export default AnnouncementList;