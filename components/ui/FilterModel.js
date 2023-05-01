import { useContext } from "react";
import { Modal, Text, StyleSheet, View, Pressable } from "react-native";
import { globalColors } from "../../constants/appColors";
import { color } from "react-native-reanimated";
import { filterContext } from "../../store/userFilter-context";

function FilterModel({onOptionSelect}) {
    const filterCtx=useContext(filterContext)

    function onPressHandler(option) {
        onOptionSelect(option)
    }

    return (
        <Modal transparent={true} animationType="fade">
            <View style={styles.root}>
                <View style={styles.modelView}>
                <Pressable
                        style={[styles.pressable,filterCtx.option===0&&{backgroundColor:globalColors.colors.primary100}]}
                        android_ripple={{ color: 'white' }}
                        onPress={onPressHandler.bind(this, 0)}>
                            <Text 
                            style={[styles.text,filterCtx.option===0&&{color:'white'}]}>
                                No filter</Text></Pressable>
                    <Pressable
                        style={[styles.pressable,filterCtx.option===1&&{backgroundColor:globalColors.colors.primary100}]}
                        android_ripple={{ color: 'white' }}
                        onPress={onPressHandler.bind(this, 1)}>
                            <Text style={[styles.text,,filterCtx.option===1&&{color:'white'}]}>
                                Today</Text></Pressable>
                    <Pressable
                        style={[styles.pressable,,filterCtx.option===2&&{backgroundColor:globalColors.colors.primary100}]}
                        android_ripple={{ color: 'white' }}
                        onPress={onPressHandler.bind(this, 2)}>
                            <Text style={[styles.text,,filterCtx.option===2&&{color:'white'}]}>Tomorrow</Text></Pressable>
                    <Pressable
                        style={[styles.pressable,,filterCtx.option===3&&{backgroundColor:globalColors.colors.primary100}]}
                        android_ripple={{ color: 'white' }}
                        onPress={onPressHandler.bind(this, 3)}>
                            <Text style={[styles.text,,filterCtx.option===3&&{color:'white'}]}>Yesterday</Text></Pressable>
                    <Pressable style={[styles.pressable,,filterCtx.option===4&&{backgroundColor:globalColors.colors.primary100}]}
                        android_ripple={{ color: 'white' }}
                        onPress={onPressHandler.bind(this, 4)}>
                            <Text style={[styles.text,,filterCtx.option===4&&{color:'white'}]}>completed Events</Text></Pressable>
                </View>
            </View>
        </Modal>
    )

}

export default FilterModel;

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    modelView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 75,
        marginTop: '75%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: globalColors.colors.primary300
    },
    pressable: {
        height: 50,
        borderBottomWidth:1,
        justifyContent: 'center',
        width: '100%',
        alignContent: 'center',
        borderColor: globalColors.colors.primary300,
        backgroundColor: globalColors.colors.primaryBackground,

    },
    text: {
        textAlign: 'center',
        fontWeight: '500',
        letterSpacing: 1,
        fontSize: 16,
        color: 'black'
    }
})