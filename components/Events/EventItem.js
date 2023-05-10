import { useNavigation } from '@react-navigation/native';
import { View, Pressable, Text, StyleSheet, Button } from 'react-native';

import { globalColors } from '../../constants/appColors';
import { dateToString } from '../../util/others/dateToString';
import { PushNotificationHandler} from '../../util/others/pNotification';
import { findDiffBetweenDates } from '../../util/others/findDiffBetweenDates';


function EventItem({data,onPress}) {
    
    const diff=findDiffBetweenDates(data.date,new Date())
   
    function onPressPushHandler(){
            PushNotificationHandler(data.event,data.about)
    }

    function isDisable(){
        if(diff==1||diff==0){
            let title=diff+" days remaining"
            return <Button title={title} onPress={onPressPushHandler} color={globalColors.colors.primary300}/>
        }else if(diff<0){
            return <Button title='Event Completed' disabled />
        }
        else{
            return <Button title='Notify' disabled />
        }
    }
    function onPressHandler(){
        onPress(data)
    }
    return (
        <Pressable style={styles.pressable} onPress={onPressHandler}>
            <View style={styles.detailContainer}>
                <Text style={styles.detail}>{data.event}</Text>
                <Text style={styles.detail}>eventDate: {dateToString(data.date)}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.detail}>Type of Event: {data.type}</Text>
                <Text style={styles.detail}>publishedDate: {dateToString(data.publishedDate)}</Text>
                
            </View>
            <View>
            {isDisable()}
            </View>
        </Pressable>
    );
}
export default EventItem;

const styles = StyleSheet.create({
    pressable: {  
        borderBottomWidth:1,
        borderBottomColor:globalColors.colors.primary100,
    },
    detailContainer:{
        flexDirection:'row',
        marginVertical:5
    },
    detail:{
        flex:1,
    },
})

