import {FlatList} from 'react-native';

import EventItem from "./EventItem";
import { fetchEvents } from "../../util/http/eventHttp";
function EventsList({dataSource}){

    function renderHandler(itemData){
    return <EventItem data={itemData.item}/>
    }
    return(
        <FlatList data={dataSource} renderItem={renderHandler} keyExtractor={(item)=>item.id}/>
    );
}

export default EventsList;