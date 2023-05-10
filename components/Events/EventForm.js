import { useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ScrollView,Alert } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import InputBox from '../ui/InputBox';
import SwitchBox from '../ui/SwitchBox';
import { globalColors } from '../../constants/appColors'
import CustomButton from '../ui/CustomButton';
import EventType from './EventType';
import {dateToString} from '../../util/others/dateToString';
import moment from 'moment';

function EventForm({ onAddEvent, defaultValue, submitButtonTitle ,onSubmit}) {

    const Navigation=useNavigation();
    const[showDatePicker,setShowDatePicker]=useState(false);
    const [isEnabled, setIsEnabled] = useState(defaultValue?defaultValue.isYearlyEvent:false);
    const [changedThumbColor, setChangedThumbColor] = useState('white');

    let moment=require('moment')

    useEffect(()=>{
        setChangedThumbColor(isEnabled ? globalColors.colors.primary300 : 'white')
    },[isEnabled])

    const [inputValues, setInputValues] = useState({
        event: defaultValue ? defaultValue.event : '',
        about: defaultValue ? defaultValue.about : '',
        date: defaultValue ? defaultValue.date : '',
        isYearlyEvent:defaultValue?defaultValue.isYearlyEvent:false,
        days:defaultValue?defaultValue.days:0,
        type: defaultValue ? defaultValue.type : ''
    })

    

    function inputChangeHandler(inputIdentifier,enteredValue){
        setInputValues((currentInputValue)=>{
            return{
                ...currentInputValue,
                [inputIdentifier]:enteredValue
            }
        })
    }

    function dateHandler() {
        setShowDatePicker(true)
    }

    function eventTypeHandler(selectedType){
        inputChangeHandler('type',selectedType.Value);
    }

    function switchHandler() {
        setIsEnabled((prev)=>!prev)
        inputChangeHandler('isYearlyEvent',!isEnabled)
    }

    function onChangeDate(event, selectedDate) {
        setShowDatePicker(false);
        inputChangeHandler('date',new Date(selectedDate));
        
    }

    function cancelHandler(){
        Navigation.goBack();
    }

    function submitHandler(){
        
        if (inputValues.event=== '' || inputValues.about === '' || inputValues.date === undefined ||inputValues.type === ''|| inputValues.days>100) {
            Alert.alert('Empty data found!', 'Please fill all required details properly', [{ text: 'Ok', style: 'ok' }])
            
        }
        else {
            /*const data = {
                event: inputValues.event,
                about: inputValues.about,
                date: inputValues.date,
                isYearlyEvent: inputValues.isYearlyEvent,
                type: inputValues.type,
                days:inputValues.days,
                publishedDate:new Date()
            }*/
            const data = {
                event: inputValues.event,
                about: inputValues.about,
                date: inputValues.type==='ame' || inputValues.type==='soothaka'?moment( new Date(inputValues.date),"DD-MM-YYYY").add(16, 'days'):inputValues.date,
                isYearlyEvent: inputValues.isYearlyEvent,
                type: inputValues.type,
                days:inputValues.days,
                publishedDate:new Date()
            }
            onSubmit(data)
        }
    }

    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                <InputBox label='Name of Event' textConfig={{
                    maxLength: 30,
                    onChangeText: inputChangeHandler.bind(this,'event'),
                    value:inputValues.event
                }} />
                <InputBox label='About Event' textConfig={{
                    maxLength: 100,
                    multiline: true,
                    height: 100,
                    onChangeText: inputChangeHandler.bind(this,'about'),
                    value: inputValues.about
                }} />
                <InputBox label='Event Date' textConfig={{
                    onChangeText:dateHandler,
                    onFocus: dateHandler,
                    value:defaultValue?dateToString(inputValues.date):dateToString(inputValues.date)
                }} />
                {
                    showDatePicker && <RNDateTimePicker
                        value={new Date()}
                        onChange={onChangeDate}
                        display='default'
                        minimumDate={new Date()}
                    />
                }
                <InputBox label="Total days" textConfig={{
                    onChangeText:inputChangeHandler.bind(this,'days'),
                    value:inputValues.days,
                    multiline:false,
                    keyboardType:'decimal-pad'
                }
                }/>
                <SwitchBox label=' Is this Yearly Event?' switchConfig={{
                    value:isEnabled,
                    onValueChange:switchHandler,
                    thumbColor: changedThumbColor
                }} />
                <EventType label='Event Type' onChangeType={eventTypeHandler} defaultType={defaultValue && defaultValue.type} />
                <View style={styles.buttonContainer}>
                    <CustomButton onPress={cancelHandler}>Cancel Event</CustomButton>
                    <CustomButton onPress={submitHandler}>{submitButtonTitle}</CustomButton>
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