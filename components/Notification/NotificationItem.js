import { useNavigation } from "@react-navigation/native";
import { Text, Pressable, View, StyleSheet } from "react-native";
import moment from "moment";
import { dateToString } from "../../util/others/dateToString";
import { globalColors } from "../../constants/appColors";
import Tag from "../ui/Tag";
import { findDiffBetweenDates } from "../../util/others/findDiffBetweenDates";

function NotificationItem({ data }) {
    const Navigation = useNavigation();
    let todaysEvent={};
    function onPressHandler() {

        const notificationData = {
            id: data.id,
            name: data.name,
            publishedDate: data.publishedDate,
            description: data.description,
            eventDate: data.date ? data.date : '',
            eventType: data.type ? data.type : '',
            eventDate: data.date ? dateToString(data.date): '',
            eventIsYearly: (data.isYearlyEvent) ? data.isYearlyEvent : ' '
        }
        Navigation.navigate("NotificationSummery", { notiData: notificationData });
    }

    function eventTagHandler() {
        const type = data.type;
        switch (type) {
            case 'varshika': return ({ backgroundColor: 'grey' })
            case 'meeting': return ({ backgroundColor: 'green' })
            case 'pooja': return ({ backgroundColor: 'brown' })
            case 'ame': return ({ backgroundColor: 'purple' })
            case 'soothaka': return ({ backgroundColor: 'black' })
        }

    }

    let strike
    function tagHandler() {

        if (data.notficationType === 'event') {
            const diff = findDiffBetweenDates(data.date, new Date())
            if (diff <= 2&&diff>=0){
                todaysEvent={}
                return <Tag>Important</Tag>
            }else{
                return ''
            }
        } else {
            const diff = findDiffBetweenDates(data.publishedDate, new Date())
            if (diff == 0)
                return <Tag>Important</Tag>
            else
                return ''
        }
    }
    if (data.remaingDays < 0) {
        strike = { textDecorationLine: 'line-through' }
    } else {
        strike = {}
    }

    let eventStatus;
    if (data.remaingDays === 0) {
        eventStatus = "Today!"
    } else if (data.remaingDays > 0 && data.type !== 'ame' || data.type !== 'soothaka') {
        eventStatus = `${data.remaingDays} days remaining`
    } else if (data.remaingDays <= -1) {
        eventStatus = "Event completed!"
    }
    return (
        <Pressable style={styles.pressable} onPress={onPressHandler} android_ripple={{ color: 'red' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{data.name}</Text>
                    <View style={styles.tagContainer}>
                        {tagHandler()}
                        <Tag style1={[data.notificationType === 'event' ? eventTagHandler() : { backgroundColor: 'blue' }]}>
                            {data.notificationType === 'event' ? data.type : 'Announcemnet'}</Tag>
                    </View>
                </View>
                <View style={styles.infoHolder}>
                    <View style={styles.detailContainer}>
                        <Text style={styles.info1}>Published on: <Text style={styles.value}>{dateToString(data.publishedDate)}</Text></Text>
                        {data.notificationType === 'event' && <Text style={[styles.info2, strike, { borderLeftWidth: 1, borderColor: globalColors.colors.primary200 }]}>Event on: <Text style={[styles.value]}>{dateToString(data.date)}</Text></Text>}
                    </View>
                    <View style={[styles.detailContainer]}>
                        <Text style={styles.info1}>Event type: <Text style={styles.value}>{data.notificationType}</Text></Text>
                        {
                            data.notificationType === 'event' &&
                            <Text style={[styles.info3, { borderLeftWidth: 1, paddingLeft: 10, borderColor: globalColors.colors.primary200 }]}>
                                {eventStatus}
                            </Text>}
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default NotificationItem;

const styles = StyleSheet.create({
    pressable: {
        borderBottomWidth: 1,
        borderBottomColor: globalColors.colors.primary100,
        
    },
    container: {
        backgroundColor:'transparent',
        marginVertical: 6
    },
    detailContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    infoHolder: {
        marginTop: 4
    },
    info1: {
        flex: 1,
        fontSize: 16,
        marginBottom: 3
    },
    info2: {
        flex: 1,
        textDecorationLine: "none",
        fontSize: 16,
        paddingLeft: 10

    },
    info3: {
        flex: 1,
        fontSize: 17,
        fontWeight: '500',
        letterSpacing: 1,
        color: 'red'
    },
    title: {
        marginHorizontal: 20,
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 1,
        flex: 1,

    },
    header: {
        flexDirection: 'row',
    },
    value: {
        fontWeight: '500',
        textTransform: 'capitalize',

    },
    tagContainer: {
        flexDirection: 'row',
        flex: 1
    }
})