import { Modal,Text ,StyleSheet,View, Pressable} from "react-native";
import { globalColors } from "../../constants/appColors";
import { color } from "react-native-reanimated";

function FilterModel(){
    return (
        <Modal transparent={true}>
        <View style={styles.root}>
        <View style={styles.modelView}>
            <Pressable style={styles.pressable} android_ripple={{color:'red'}}><Text style={styles.text}>Today</Text></Pressable>
            <Pressable style={styles.pressable } android_ripple={{color:'red'}}><Text style={styles.text}>Tomorrow</Text></Pressable>
            <Pressable style={styles.pressable} android_ripple={{color:'red'}}><Text style={styles.text}>Yesterday</Text></Pressable>
            <Pressable style={styles.pressable} android_ripple={{color:'red'}}><Text style={styles.text}>completed Events</Text></Pressable>
        </View>
        </View>
        </Modal>
    )

}

export default FilterModel;

const styles=StyleSheet.create({
    root:{
        flex:1
    },
    modelView:{
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:75,
        marginTop:'75%',
        borderWidth:1,
        borderRadius:5,
        borderColor:globalColors.colors.primary300
    },
    pressable:{
        height:50,
        borderWidth:1,
        justifyContent:'center',
        width:'100%',
        alignContent:'center',
        borderColor:globalColors.colors.primary300,
        backgroundColor:globalColors.colors.primary100
    },
    text:{
        textAlign:'center',
        fontWeight:'500',
        letterSpacing:1,
        fontSize:16,
        color:'white'
    }
})