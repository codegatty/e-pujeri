import {View,ActivityIndicator,StyleSheet} from 'react-native';
import { globalColors } from '../../constants/appColors';

function LoadingOverlay(){
return (
    <View style={styles.container}>
        <ActivityIndicator color={globalColors.colors.primary100} size='large'/>
    </View>
)
}

export default LoadingOverlay;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})