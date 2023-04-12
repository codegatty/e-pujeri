
import {ScrollView,View,StyleSheet} from 'react-native';

import Detail from '../ui/Detail';
import Title from '../ui/Title';
import { globalColors } from '../../constants/appColors';

function AnnouncementDetails({annData}){
    
return(
    <ScrollView style={styles.container}>
        <View style={styles.container}>
            <Title style1={styles.title}>{annData.name}</Title>
            <View style={styles.detailsContainer}>
                <Detail title="Description" value={annData.description}/>
                <Detail title="published Date" value={annData.publishedDate}/>
            </View>
        </View>
        </ScrollView>
)
}

export default AnnouncementDetails;

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