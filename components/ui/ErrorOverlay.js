import {View,Text,StyleSheet} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { globalColors } from '../../constants/appColors';
import CustomButton from './CustomButton';
function ErrorOverlay({message,onPress}){
return (
    <View style={styles.container}>
        <Ionicons name="warning-outline" size={30} color={globalColors.colors.primary300}/>
        <Text style={[styles.message,{fontSize:20,textAlign:'center',marginBottom:5}]}>Error</Text>
        <Text style={styles.message}>{message}</Text>
        <CustomButton onPress={onPress}>Go back</CustomButton>
    </View>
)
}

export default ErrorOverlay;

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    message:{
        fontSize:16,
        fontWeight:'700',
        color:globalColors.colors.primary300,
        marginBottom:10
    }
})