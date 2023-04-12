import {FlatList,Text} from 'react-native';

import NotificationItem from './NotificationItem';
function NotificationList({data}){
    
    function renderHandler(item){
        return <NotificationItem data={item.item}/>
    }
    return(<>
        <FlatList data={data}renderItem={renderHandler} keyExtractor={(item)=>item.id}/>
        
        </>
    );

}

export default NotificationList;