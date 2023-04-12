import { Pressable, Text,View,StyleSheet } from 'react-native';

import { globalColors } from '../../constants/appColors';
function CustomButton({children,onPress,style1,style2,style3}) {
    //style1 for modification of mainContainer
    //style2 for modification of text
    //style3 for modification of pressable(linke border etc)
    return (
        <View style={[styles.container,style1]}>
            <Pressable 
            style={[styles.pressable,style3]} 
            android_ripple={{color:'black'}} 
            onPress={onPress}>

                <Text style={[styles.text,style2]}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default CustomButton;

const styles=StyleSheet.create({
    container:{
        overflow:'hidden',
        elevation:5
    },
    pressable:{         
        backgroundColor:globalColors.colors.primary300,
        borderRadius:5,
        paddingHorizontal:20,
        paddingVertical:10,
    },
    text:{
        color:'white',
        fontSize:14,
        fontWeight:'400',
    }
})