import {View,ScrollView,Text,StyleSheet} from 'react-native';

import Title from '../ui/Title'
import { globalColors } from '../../constants/appColors';
import  Detail from '../ui/Detail';
import { findDiffBetweenDates } from '../../util/others/findDiffBetweenDates';

function EventDetails({event}){
    return(
        <ScrollView style={styles.container}>
        <View style={styles.container}>
            <Title style1={styles.title}>{ event.event}</Title>
            <View style={styles.detailsContainer}>
                <Detail title="About" value={event.about}/>
                <Detail title="Event Type" value={event.type}/>
                <Detail title="Is Yearly" value={event.isYearlyEvent.toString()}/>
                <Detail title="Event Date" value={event.date}/>
                <Detail title="Total days" value={event.totalDays}/>
                <Detail title="Remaining days" value={event. currentDays}/>
                <Detail title="IsNotified" value={event.isNotified}/>
                <Detail title="Published Date" value={event.publishedDate}/>
            </View>
        </View>
        </ScrollView>
    );
}

export default EventDetails;

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