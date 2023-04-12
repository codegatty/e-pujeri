import {Switch,View,Text,StyleSheet} from 'react-native';

import { globalColors } from '../../constants/appColors';

function SwitchBox({label,switchConfig}){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Switch {...switchConfig} 
            style={styles.switch} 
            trackColor={{true:globalColors.colors.primary200,false:'grey'}}
            />
        </View>
    )
}

export default SwitchBox;

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:10,
        marginVertical:15
        
    },
    label:{
        flex:1,
        fontSize:18,
        textAlign:'center',
        fontWeight:'300'
    },
    switch:{
        flex:2,
        padding:5,
    }
})