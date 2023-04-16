import { View,StyleSheet } from "react-native";

import NotificationDetails from "./NotificationDetails";

function NotificationSummery({ route }) {
    const notificationData = route.params.notiData;
   
    return (
        <View style={styles.mainContainer}>
            <View style={styles.detailContainer}>
                <NotificationDetails notiData={notificationData} />
            </View>
        </View>
    )
}

export default NotificationSummery;


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    detailContainer: {
        flex: 2,
    },
    buttonContainer: {
        backgroundColor:'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonStyle1: {
        borderRadius:0,
        paddingHorizontal:30  
    },
    buttonStyle2: {
        flex: 1,
        borderRightWidth:1,
        borderColor:'grey'
    },
    buttonStyle3: {
        textAlign: 'center'
    }
})