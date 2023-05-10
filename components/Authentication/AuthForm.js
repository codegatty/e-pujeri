import { useState,useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {View,StyleSheet} from 'react-native';


import Title from '../ui/Title';
import Input from '../../components/ui/Input';
import { globalColors } from '../../constants/appColors';
import CustomButton from '../../components/ui/CustomButton';
import { AuthenticateAdmin } from '../../util/http/auth';
import { AdminAuthContext } from '../../store/adminAuth-context';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import ErrorOverlay from '../../components/ui/ErrorOverlay';

function AuthForm(){

    const Navigation=useNavigation();
    const adminAuthCtx=useContext(AdminAuthContext);

    const [email,setEmail]=useState('');
    const [password,setPassWord]=useState('');
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false)

    async function confirmHandler(){
        setLoading(true);
        try{
        const token=await AuthenticateAdmin(email,password);
        adminAuthCtx.storeToken(token);
        }catch(e){
            setError(true);
        }
        setLoading(false);
    }

    function cancelHandler(){
        setError(false);
        setEmail('');
        setPassWord('');
        Navigation.goBack();
    }

    if(error){
        return <ErrorOverlay message="Unable to Sign In check Your Password and Email" onPress={cancelHandler}/>
    }

    if(loading){
        return <LoadingOverlay/>
    }

        return(
        <View style={styles.container}>
            <Title>Admin</Title>
            
            <Input label='Email' inputConfig={{
                keyboardType:'email-address',
                onChangeText:(value)=>setEmail(value),
                value:email,
                autoComplete:'email'
            }}/>

            <Input label='password' inputConfig={{
                onChangeText:(value)=>setPassWord(value),
                value:password,
                secureTextEntry:true
            }}/>
            <View style={styles.buttonContainer}>
            <CustomButton onPress={cancelHandler}>Cancel</CustomButton> 
               <CustomButton onPress={confirmHandler}>Login</CustomButton>
               
            </View>
        </View>
    )
}

export default AuthForm;

const styles=StyleSheet.create({
    container:{
        
        borderColor:globalColors.colors.primary200,
        padding:40,
        marginHorizontal:10,
        marginVertical:80,
        borderRadius:8,
            
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20

    }
})