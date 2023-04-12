import {View,ScrollView,Text,StyleSheet} from 'react-native';

import Title from '../ui/Title'
import { globalColors } from '../../constants/appColors';
import  Detail from '../ui/Detail';
import { dateToString } from '../../util/others/dateToString';

function EventDetails({event}){
    console.log(event);
    return(
        <ScrollView style={styles.container}>
        <View style={styles.container}>
            <Title style1={styles.title}>{ event.event}</Title>
            <View style={styles.detailsContainer}>
                <Detail title="About" value={event.about}/>
                <Detail title="Event Type" value={event.type}/>
                <Detail title="Is Yearly" value={event.isYearlyEvent.toString()}/>
                <Detail title="Event Date" value={dateToString(event.date)}/>
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