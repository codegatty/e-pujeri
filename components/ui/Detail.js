import {View,Text,StyleSheet} from 'react-native';

import {globalColors} from '../../constants/appColors';

function Detail({title,value}){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.text}>{value}</Text>
        </View>
    );
}

export default Detail;

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        padding:5,
        borderBottomWidth:1,
        padding:5,
        marginHorizontal:14,
        marginVertical:5,
        borderBottomColor:globalColors.colors.primary100
    },
    text:{
        flex:2,
        fontSize:18,
        fontWeight:'300'
    }
})