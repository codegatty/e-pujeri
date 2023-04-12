import {FlatList} from 'react-native';

import AnnouncementItem from '../Announcement/AnnouncementItem';

function AnnouncementList({dataSource}){
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