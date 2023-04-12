import {View,TextInput,Text,StyleSheet} from 'react-native';
import { globalColors } from '../../constants/appColors';


function Input({label,inputConfig}){
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} {...inputConfig} secure/>
        </View>
    )
}

export default Input;

const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        
    },
    input:{
        backgroundColor:globalColors.colors.primary200,
        fontSize:18,
        paddingHorizontal:5,
        paddingVertical:5,
        borderRadius:7,
        color:'white'
    },
    label:{
        fontSize:15,
        fontWeight:'300',
        marginBottom:5
    }
})