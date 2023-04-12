import { useNavigation } from '@react-navigation/native';
import { View, Pressable, Text, StyleSheet } from 'react-native';

import { globalColors } from '../../constants/appColors';
import { dateToString } from '../../util/others/dateToString';

function EventItem({data}) {
    const Navigation=useNavigation();

    function onPressHandler(){
        Navigation.navigate('EventSummery',{id:data.id})
    }
    return (
        <Pressable style={styles.pressable} onPress={onPressHandler}>
            <View style={styles.detailContainer}>
                <Text style={styles.detail}>{data.event}</Text>
                <Text style={styles.detail}>eventDate: {dateToString(data.date)}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.detail}>Type of Event: {data.type}</Text>
                <Text style={styles.detail}>publishedDate: {}</Text>
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
    }
})

