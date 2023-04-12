import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';

import InputBox from '../../components/ui/InputBox';
import Title from '../../components/ui/Title';
import SwitchBox from '../../components/ui/SwitchBox';
import { globalColors } from '../../constants/appColors';
import EventType from '../../components/Events/EventType';
import CustomButton from '../../components/ui/CustomButton';

function EventForm({ onAddEvent,defaultValue,submitButtonTitle}) {
    //name of event
    const [eventName, setEventName] = useState('');

    //aboutEvent
    const [eventAbout, setEventAbout] = useState('');

    //date Picker
    const [eventDate, setEventDate] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);

    //Switch
    const [isEnabled, setIsEnabled] = useState(false);
    const [changedThumbColor, setChangedThumbColor] = useState('white');

    //Picker
    const [eventType, setEventType] = useState('');
    //other variables
    const Navigation=useNavigation();

    useEffect(() => {
        setChangedThumbColor(() => isEnabled ? globalColors.colors.primary300 : 'white');
    }, [isEnabled])

    function dateHandler() {
        setShowDatePicker(true)
    }

    function onChangeDate(event, selectedDate) {
        setShowDatePicker(false);
        const selectedDateinDate = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getDate();
        setEventDate(selectedDateinDate);
    }

    function switchHandler() {
        setIsEnabled((prev) => !prev)
    }

    function eventTypeHandler(selectedType) {
        setEventType(selectedType.Value);
    }

    function eventNameHandler(value) {
        setEventName(value);
    }

    function eventAboutHandler(value) {
        setEventAbout(value);
    }

    function cancelHandler() {
        Navigation.goBack();
    }

    //submitting data handler
    function addHandler() {

        if (eventName === '' || eventAbout === '' || eventDate === undefined || eventType === '') {
            Alert.alert('Empty data found!', 'Please fill all required details properly', [{ text: 'Ok', style: 'ok' }])
            
        }
        else {
            const data = {
                event: eventName,
                about: eventAbout,
                date: eventDate,
                isYearlyEvent: isEnabled,
                type: eventType
            }
            onAddEvent(data)
        }

    }

    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                <InputBox label='Name of Event' textConfig={{
                    maxLength: 30,
                    onChangeText: eventNameHandler,
                    value: defaultValue?defaultValue.event:eventName
                }} />
                <InputBox label='About Event' textConfig={{
                    maxLength: 100,
                    multiline: true,
                    height: 100,
                    onChangeText: eventAboutHandler,
                    value: defaultValue?defaultValue.about:eventAbout
                }} />
                <InputBox label='Event Date' textConfig={{
                    onChangeText: dateHandler,
                    onFocus: dateHandler,
                    value: defaultValue?defaultValue.date.toString():eventDate
                }} />
                {
                    showDatePicker && <RNDateTimePicker
                        value={new Date()}
                        onChange={onChangeDate}
                        display='default'
                        minimumDate={new Date()}
                    />
                }
                <SwitchBox label=' Is this Yearly Event?' switchConfig={{
                    value: defaultValue?defaultValue.isYearlyEvent:isEnabled,
                    onValueChange: switchHandler,
                    thumbColor: changedThumbColor
                }} />
                <EventType label='Event Type' onChangeType={eventTypeHandler} defaultType={defaultValue&&defaultValue.type} />
                <View style={styles.buttonContainer}>
                    <CustomButton onPress={cancelHandler}>Cancel Event</CustomButton>
                    <CustomButton onPress={addHandler}>{submitButtonTitle}</CustomButton>
                </View>
            </View>
        </ScrollView>
    );
}

export default EventForm;

const styles = StyleSheet.create({
    mainContainer: {

    },
    container: {
        flexDirection: 'column'
    },
    text: {
        fontSize: 15,
        borderWidth: 1,
        flex: 1
    },
    calander: {
        height: 500
    },
    buttonContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})