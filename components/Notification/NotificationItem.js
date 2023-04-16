import { useNavigation } from "@react-navigation/native";
import { Text,Pressable,View,StyleSheet} from "react-native";

import { dateToString } from "../../util/others/dateToString";
import { globalColors } from "../../constants/appColors";
function NotificationItem({data}){
    const Navigation=useNavigation();
    function onPressHandler(){
        
        const notificationData={
            id:data.id,
            name:data.name,
            publishedDate:data.publishedDate,
            description:data.description,
            eventDate:data.date?data.date:'',
            eventType:data.type?data.type:'',
            eventDate:data.date?data.date:'',
            eventIsYearly:(data.isYearlyEvent)?data.isYearlyEvent:' '
        }
        Navigation.navigate("NotificationSummery",{notiData:notificationData});
    }
return(
    <Pressable style={styles.pressable} onPress={onPressHandler}>
    <View style={styles.detailContainer}>
        <Text style={styles.detail}> {data.name}</Text>
        <Text style={styles.detail}>PublishedDate: {dateToString(data.publishedDate)}</Text>
    </View>
</Pressable>
);
}

export default NotificationItem;

const styles = StyleSheet.create({
    pressable: {
        borderBottomWidth: 1,
        borderBottomColor: globalColors.colors.primary100,
    },
    detailContainer: {
        flexDirection: 'row',
        marginVertical: 5
    },
    detail: {
        flex: 1,
    }
})