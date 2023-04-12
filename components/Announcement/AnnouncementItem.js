import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Pressable,View,Text } from 'react-native';

import { dateToString } from '../../util/others/dateToString';
import { globalColors } from '../../constants/appColors';


function AnnouncementList({data,onPress}) {

    const Naviagtion=useNavigation();

    function onPressHandler(){
        //if you can't pass route data properly eventLList method 
        const annData={
            id:data.id,
            name:data.name,
            description:data.description,
            publishedDate:dateToString(data.publishedDate)
        };
        Naviagtion.navigate('AnnouncementSummery',{annData:annData})
    }
    return (
        <Pressable style={styles.pressable} onPress={onPressHandler}>
            <View style={styles.detailContainer}>
                <Text style={styles.detail}> {data.name}</Text>
                <Text style={styles.detail}>PublishedDate: {dateToString(data.publishedDate)}</Text>
            </View>
        </Pressable>
    );
}

export default AnnouncementList;

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
