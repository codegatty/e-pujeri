import {View,StyleSheet} from 'react-native';

import AuthForm from '../../components/Authentication/AuthForm' 
import { globalColors } from '../../constants/appColors';

function Authentication(){

    return (
        <View style={styles.container}>
        <AuthForm/>
        </View>
    );
}

export default Authentication;


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:globalColors.colors.primaryBackground
    }
})
