import { Pressable,View,Text,StyleSheet } from "react-native";
import { globalColors } from "../../constants/appColors";
function HeaderButton({children,onpress}){
    return(
        <Pressable onPress={onpress} style={styles.root} android_ripple={{color:'#D3D3D3'}}>
            <View>
                <Text style={styles.title}>{children}</Text>
            </View>
        </Pressable>
    )

}

export default HeaderButton;

const styles=StyleSheet.create({
    root:{
        maxWidth:200,
        paddingHorizontal:5,
        paddingVertical:2,
        borderRadius:5,
    },
    container:{

    },
    title:{
        color:globalColors.colors.primary100,
        fontWeight:'600'
    }
})