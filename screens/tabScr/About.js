import {Text,View,ScrollView,StyleSheet}  from 'react-native';

import Title from '../../components/ui/Title';
import Detail from '../../components/ui/Detail';


function About({route}){
    const userType=route.params.userType;
    //user type can be used to restrict some functions for normal user
    return(
        <ScrollView>
        <View style={styles.rootContainer}><View style={styles.titleContainer}>
            <Title>Pujeri thervad</Title>
            </View>
            <View style={styles.detailContainer}>
                <Detail title="Address" value="Pelthadka,naikap,kumbla,671321,kasargod"/>
                <Detail title="No.of members" value="120"/>
                
            </View>
        </View>     

        </ScrollView>   
    )
}

export default About;

const styles=StyleSheet.create({
    rootContainer:{
        flex:1
    },
    titleContainer:{
        marginTop:25
    },
    detailContainer:{
        marginTop:12
    }
})