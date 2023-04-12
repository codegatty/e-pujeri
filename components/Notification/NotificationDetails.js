
import {ScrollView,View,StyleSheet} from 'react-native';

import Detail from '../ui/Detail';
import Title from '../ui/Title';
import { globalColors } from '../../constants/appColors';
import {dateToString} from '../../util/others/dateToString';

function NotificationDetails({notiData}){
    return(
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                <Title style1={styles.title}>{notiData.name}</Title>
                <View style={styles.detailsContainer}>
                    <Detail title="Description" value={notiData.description}/>
                    {notiData.eventDate&&<Detail title="Event Date" value={dateToString(notiData.eventDate)}/>}
                    {notiData.eventType&&<Detail title="Event Type" value={notiData.eventType}/>}
                    {typeof(notiData.eventIsYearly)!="undefined"&&<Detail title="Is Yearly Event" value={notiData.eventIsYearly?.toString()}/>}
                    <Detail title="publidhed Date" value={dateToString(notiData.publishedDate)}/>
                </View>
            </View>
            </ScrollView>
    )
}

export default NotificationDetails;

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop:10
    },
    detailsContainer:{
        marginTop:15,
        borderTopWidth:1,
        borderTopColor:globalColors.colors.primary200,
        borderStyle:'dotted'
    },
    title:{
        fontSize:32,
        color:globalColors.colors.primary200,
        fontWeight:'400'
    }
})