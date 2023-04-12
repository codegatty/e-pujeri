import { useState } from 'react';
import { View, ScrollView, StyleSheet,Alert } from 'react-native';

import InputBox from '../ui/InputBox';
import CustomButton from '../ui/CustomButton';

function AnnouncementForm({onSubmit,onCancel,submitButtonTitle,defaultValue}) {

  const [inputValues,setInputValues]=useState({
    name:defaultValue?defaultValue.name:'',
    description:defaultValue?defaultValue.description:''
  })

  function inputChangeHandler(inputIdentifier,enteredValue){
    setInputValues((currentInputValues)=>{
      return {...currentInputValues,[inputIdentifier]:enteredValue}
    })
  }

  function submitHandler(){
    if (inputValues.name=== '' || inputValues.description === '') {
      Alert.alert('Empty data found!', 'Please fill all required details properly', [{ text: 'Ok', style: 'ok' }])
      
  }else{
    const data={
      name:inputValues.name,
      description:inputValues.description,
      publishedDate:new Date()
    }
    onSubmit(data)
  }
  }

  function cancelHandler(){
    onCancel();
  }

  return (
    <ScrollView>
      <View>
        <InputBox
          label="Name of Annoucement"
          textConfig={{
            maxLength: 30,
            onChangeText: inputChangeHandler.bind(this,'name'),
            value: inputValues.name
          }}
        />
        <InputBox
          label="Description of Annoucement"
          textConfig={{
            maxLength: 100,
            multiline: true,
            height: 100,
            onChangeText:inputChangeHandler.bind(this,'description'),
            value:inputValues.description
          }}
        />
        <View style={styles.buttonContainer}>
          <CustomButton onPress={cancelHandler}>Cancel</CustomButton>
          <CustomButton onPress={submitHandler}>{submitButtonTitle}</CustomButton>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
}
})

export default AnnouncementForm;