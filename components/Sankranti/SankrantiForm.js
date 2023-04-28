import { useState } from "react";
import { Text, View, ScrollView, TextInput, StyleSheet, Button,ToastAndroid } from "react-native";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import InputBox from "../ui/InputBox";
import { dateToString } from "../../util/others/dateToString";
import { globalColors } from "../../constants/appColors";
function SankrantiForm({onSubmit,sanData}) {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [inputDateValues, setInputDateValues] = useState({
        jan:sanData.jan[0],
        feb:sanData.feb[0],
        mar:sanData.mar[0],
        apr:sanData.apr[0],
        may:sanData.may[0],
        jun:sanData.jun[0],
        jul:sanData.jul[0],
        aug:sanData.aug[0],
        sep:sanData.sep[0],
        oct:sanData.oct[0],
        nov:sanData.nov[0],
        dec:sanData.dec[0]
    })

    const [inputDescValues, setInputDescValues] = useState({
        jan:sanData.jan[1],
        feb: sanData.feb[1],
        mar: sanData.mar[1],
        apr: sanData.apr[1],
        may: sanData.may[1],
        jun: sanData.jun[1],
        jul: sanData.jul[1],
        aug: sanData.aug[1],
        sep: sanData.sep[1],
        oct: sanData.oct[1],
        nov: sanData.nov[1],
        dec: sanData.dec[1]
    })

    function dateHandler() {
        setShowDatePicker(true);
    }

    function inputDateChangeHandler(month, date) {
        setInputDateValues((current) => {
            return {
                ...current,
                [month]: date
            }
        })
    }

    function inputDescChangeHandler(month, value) {
        setInputDescValues((current) => {

            return {
                ...current,
                [month]: value
            }
        })
    }

    function onChangeDate(event, date) {
        setShowDatePicker(false)
        const selectedDate = new Date(date);
        const month = selectedDate.getMonth() + 1;
        switch (month) {
            case 1: inputDateChangeHandler('jan', selectedDate);
                break;
            case 2: inputDateChangeHandler('feb', selectedDate);
                break;
            case 3: inputDateChangeHandler('mar', selectedDate);
                break;
            case 4: inputDateChangeHandler('apr', selectedDate);
                break;
            case 5: inputDateChangeHandler('may', selectedDate);
                break;
            case 6: inputDateChangeHandler('jun', selectedDate);
                break;
            case 7: inputDateChangeHandler('jul', selectedDate);
                break;
            case 8: inputDateChangeHandler('aug', selectedDate);
                break;
            case 9: inputDateChangeHandler('sep', selectedDate);
                break;
            case 10: inputDateChangeHandler('oct', selectedDate);
                break;
            case 11: inputDateChangeHandler('nov', selectedDate);
                break;
            case 12: inputDateChangeHandler('dec', selectedDate);
                break;
        }
    }

    function updateHandler(){
        const data={
            jan:[inputDateValues.jan,inputDescValues.jan],
            feb:[inputDateValues.feb,inputDescValues.feb],
            mar:[inputDateValues.mar,inputDescValues.mar],
            apr:[inputDateValues.apr,inputDescValues.apr],
            may:[inputDateValues.may,inputDescValues.may],
            jun:[inputDateValues.jun,inputDescValues.jun],
            jul:[inputDateValues.jul,inputDescValues.jul],
            aug:[inputDateValues.aug,inputDescValues.aug],
            sep:[inputDateValues.sep,inputDescValues.sep],
            oct:[inputDateValues.oct,inputDescValues.oct],
            nov:[inputDateValues.nov,inputDescValues.nov],
            dec:[inputDateValues.dec,inputDescValues.dec],
        }
        ToastAndroid.showWithGravity("Date successfully updated!",ToastAndroid.LONG,ToastAndroid.TOP)
        onSubmit(data);
    }

    return (
        <ScrollView>
            <View>
                <View style={styles.container}>
                    <InputBox label="janauary" textConfig={
                        {
                            onfocus: dateHandler,
                            onChangeText: dateHandler,
                            onchange: dateHandler,
                            value: dateToString(inputDateValues.jan)
                        }
                    } />
                    <InputBox label="Description" textConfig={{ 
                        onChangeText: inputDescChangeHandler.bind(this, 'jan'),
                        value:inputDescValues.jan }} />
                    <View>
                        <Button title="Update" onPress={updateHandler} />
                    </View>
                </View>
                <View style={styles.container}>
                    <InputBox label="Febravery" textConfig={{
                        onfocus: dateHandler,
                        onChangeText: dateHandler,
                        onchange: dateHandler,
                        value: dateToString(inputDateValues.feb)
                    }} />
                    <InputBox label="Description" textConfig={{ 
                        onChangeText: inputDescChangeHandler.bind(this, 'feb'),
                        value:inputDescValues.feb}} />
                    <Button title="Update" onPress={updateHandler}/>
                </View>
                <View style={styles.container}>
                    <InputBox label="March" textConfig={{
                        onfocus: dateHandler,
                        onChangeText: dateHandler,
                        onchange: dateHandler,
                        value: dateToString(inputDateValues.mar)
                    }} />
                    <InputBox label="Description" textConfig={{ onChangeText: inputDescChangeHandler.bind(this, 'mar'),
                value:inputDescValues.mar }}/>
                    <Button title="Update" onPress={updateHandler}/>
                </View>
                <View style={styles.container}>
                    <InputBox label="April" textConfig={{
                        onfocus: dateHandler,
                        onChangeText: dateHandler,
                        onchange: dateHandler,
                        value: dateToString(inputDateValues.apr)
                    }} />
                    <InputBox label="Description" textConfig={{ onChangeText: inputDescChangeHandler.bind(this, 'apr'),
                value:inputDescValues.apr }}/>
                    <Button title="Update" onPress={updateHandler}/>
                </View>
                <View style={styles.container}>
                    <InputBox label="May" textConfig={{
                        onfocus: dateHandler,
                        onChangeText: dateHandler,
                        onchange: dateHandler,
                        value: dateToString(inputDateValues.may)
                    }} />
                    <InputBox label="Description" textConfig={{ onChangeText: inputDescChangeHandler.bind(this, 'may'),
                value:inputDescValues.may }}/>
                    <Button title="Update" onPress={updateHandler}/>
                </View>
                <View style={styles.container}>
                    <InputBox label="June"  textConfig={{
                        onfocus: dateHandler,
                        onChangeText: dateHandler,
                        onchange: dateHandler,
                        value: dateToString(inputDateValues.jun)
                    }}/>
                    <InputBox label="Description" textConfig={{ onChangeText: inputDescChangeHandler.bind(this, 'jun'),
                value:inputDescValues.jun }}/>
                    <Button title="Update" onPress={updateHandler}/>
                </View>
                <View style={styles.container}>
                    <InputBox label="July" textConfig={{
                        onfocus: dateHandler,
                        onChangeText: dateHandler,
                        onchange: dateHandler,
                        value: dateToString(inputDateValues.jul)
                    }}/>
                    <InputBox label="Description" textConfig={{ onChangeText: inputDescChangeHandler.bind(this, 'jul'),
                value:inputDescValues.jul }}/>
                    <Button title="Update" onPress={updateHandler}/>
                </View>
                <View style={styles.container}>
                    <InputBox label="August" textConfig={{
                        onfocus: dateHandler,
                        onChangeText: dateHandler,
                        onchange: dateHandler,
                        value: dateToString(inputDateValues.aug)
                    }}/>
                    <InputBox label="Description" textConfig={{ onChangeText: inputDescChangeHandler.bind(this, 'aug'),
                value:inputDescValues.aug }}/>
                    <Button title="Update" onPress={updateHandler}/>
                </View >
                <View style={styles.container}>
                    <InputBox label="September" textConfig={{
                        onfocus: dateHandler,
                        onChangeText: dateHandler,
                        onchange: dateHandler,
                        value: dateToString(inputDateValues.sep)
                    }}/>
                    <InputBox label="Description" textConfig={{ onChangeText: inputDescChangeHandler.bind(this, 'sep'),
                value:inputDescValues.sep }}/>
                    <Button title="Update" onPress={updateHandler}/>
                </View>
                <View style={styles.container}>
                    <InputBox label="October" textConfig={{
                        onfocus: dateHandler,
                        onChangeText: dateHandler,
                        onchange: dateHandler,
                        value: dateToString(inputDateValues.oct)
                    }}/>
                    <InputBox label="Description" textConfig={{ onChangeText: inputDescChangeHandler.bind(this, 'oct'),
                value:inputDescValues.oct }}/>
                    <Button title="Update" onPress={updateHandler}/>
                </View>
                <View style={styles.container}>
                    <InputBox label="November" textConfig={{
                        onfocus: dateHandler,
                        onChangeText: dateHandler,
                        onchange: dateHandler,
                        value: dateToString(inputDateValues.nov)
                    }}/>
                    <InputBox label="Description" textConfig={{ onChangeText: inputDescChangeHandler.bind(this, 'nov'),
                value:inputDescValues.nov }}/>
                    <Button title="Update" onPress={updateHandler}/>
                </View>
                <View style={styles.container}>
                    <InputBox label="December" textConfig={{
                        onfocus: dateHandler,
                        onChangeText: dateHandler,
                        onchange: dateHandler,
                        value: dateToString(inputDateValues.dec)
                    }}/>
                    <InputBox label="Description" textConfig={{ onChangeText: inputDescChangeHandler.bind(this, 'dec'),
                value:inputDescValues.dec }}/>
                    <Button title="Update" onPress={updateHandler}/>
                </View>
            </View>
            {
                showDatePicker && <RNDateTimePicker
                    value={new Date()}
                    display='default'
                    minimumDate={new Date()}
                    onChange={onChangeDate}
                />
            }
        </ScrollView>
    );

}

export default SankrantiForm;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: globalColors.colors.primary300,
        borderRadius: 7,
        margin: 10,
    }

})