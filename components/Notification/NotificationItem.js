import { useNavigation } from "@react-navigation/native";
import { Text,Pressable,View,StyleSheet} from "react-native";

import { dateToString } from "../../util/others/dateToString";
import { globalColors } from "../../constants/appColors";
import Tag from "../ui/Tag";
import { findDiffBetweenDates } from "../../util/others/findDiffBetweenDates";
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

    
    function tagHandler(){
        if(data.notficationType==='event'){
            const diff=findDiffBetweenDates(data.date,new Date())
            if(diff<=1)
                return <Tag>Important</Tag>
            else
                return ''
        }else{
            const diff=findDiffBetweenDates(data.publishedDate,new Date())
            if(diff==0)
                return <Tag>Important</Tag>
            else
                return ''
        }
    }
return(
    <Pressable style={styles.pressable} onPress={onPressHandler}>
    <View style={styles.detailContainer}>
        <Text style={styles.detail}> {data.name}</Text>
        <Text style={styles.detail}>PublishedDate: {dateToString(data.publishedDate)}</Text>
    </View>
    <View style={styles.mainTagContainer}>
        <View style={styles.tagContainer}>
        {tagHandler()}
        <Tag style1={[data.notficationType==='event'?{backgroundColor:'green'}:{backgroundColor:'blue'},styles.tag]}>
            {data.notficationType==='event'?'Event':'Announcemnet'}</Tag>
        </View>
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
    },
    mainTagContainer:{
        flexDirection:'column',
    },
    tagContainer:{
        flexDirection:'row-reverse',
        marginLeft:10
    },tag:{
        marginLeft:8
    }
})