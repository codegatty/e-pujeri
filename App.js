import { useContext, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as notification from 'expo-notifications';
import { Platform } from 'react-native';


//Contexts
import AdminAuthProvider from './store/adminAuth-context';
import EventContextProvider from './store/events-context';
import AnnouncementContextProvider from './store/announcements-context';
import NotificationContextProvider from './store/allEvents-context';
import ShowAllEventProvider from './store/showAllEvent-context';
import ShowAllNoificationProvider from './store/showAllNotification-Context';
import NotificationViewProvider from './store/notificationView-context';
//Drawer
import AdminScreen from './screens/drawerScr/AdminScreen';
import UserScreen from './screens/drawerScr/UserScreen';
//BottomTab
import About from './screens/tabScr/About';
import Events from './screens/tabScr/Events';
import Announcements from './screens/tabScr/Announcements';
import Notifications from './screens/tabScr/User/Notifications';
import Sankranti from './screens/tabScr/User/Sankranti';
//Stack
import Authentication from './screens/stack/Authentication';
import ManageEvent from './components/Events/ManageEvent';
import EventSummery from './components/Events/EventSummery';
import ManageAnnouncement from './components/Announcement/ManageAnnouncement';
import AnnouncementSummery from './components/Announcement/AnnouncementSummery';
import NotificationSummery from './components/Notification/NotificationSummery';
import ManageSankranti from './components/Sankranti/ManageSankranti';
//other
import { globalColors } from './constants/appColors';
import { AdminAuthContext } from './store/adminAuth-context';
import CustomButton from './components/ui/CustomButton';
import AdminHeader from './components/Header/AdminHeader';
import UserHeader from './components/Header/UserHeader';
//import { sendPushNotificationHandler } from './util/others/PushNotification';
import { addTokenToDatabasae } from './util/http/pushTokenHttp';

export default function App() {

  //Firebase installation
  //Firebase installation

  //Navigation variables
  const Drawer = createDrawerNavigator();
  const BottomTab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  
  //obtainign push token
  useEffect(()=>{ 
    notification.getExpoPushTokenAsync().then((token)=>{
      addTokenToDatabasae(token.data);
    }).catch((err)=>{
        let message=JSON.stringify(err)
      Alert.alert("getExpoPushAsync() problem",message)
    })
  },[])

  //obtaing push token

  //push Notification
  useEffect(() => {
    async function configurePushNotifcation(){
      const {status}=await notification.getPermissionsAsync();
      let finalStatus=status;

      if(finalStatus!=='granted'){
        const {status}=notification.requestPermissionsAsync();
        finalStatus=status;
      }
      if(finalStatus!=='granted'){
        Alert.alert('Permision require','please ensure that you enabled push notification for this app')
        return
      }
      const pushTokenData=await notification.getExpoPushTokenAsync();
      if(Platform.OS==='android'){
        notification.getNotificationChannelAsync('default',{
          name:'default',
          importance:notification.AndroidImportance.DEFAULT
        })
      }
    }
    configurePushNotifcation();
  }, [])
  //push notification
  function DrawerNavigation() {
    const authCtx = useContext(AdminAuthContext);
    return (
      <Drawer.Navigator screenOptions={{
        headerStyle: { backgroundColor: globalColors.colors.primary200, },
        drawerStyle: { backgroundColor: globalColors.colors.primary300, width: 200 },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'white',
        headerTintColor: 'white',

      }}>
        <Drawer.Screen name='User' component={UserPanel} options={{
          drawerIcon: ({ size }) => <Ionicons name="people-outline" size={size} color={globalColors.colors.primary100} />
        }} />
        <Drawer.Screen name='Admin' component={AdminPanel} options={({ navigation }) => ({
          title: 'Admin',
          headerRight: ({ size }) => authCtx.isAuth && <CustomButton
            style1={{ marginRight: 20 }}
            style2={{ fontSize: 12, fontWeight: '500' }}
            onPress={() => {
              authCtx.logOut();
              navigation.navigate('User')
            }}
          >Log out</CustomButton>,
          drawerIcon: ({ size }) => <Ionicons name='eye-outline' size={size} color={globalColors.colors.primary100} />
        })} />
      </Drawer.Navigator>
    );
  }


  //AdminPanel
  function AdminPanel() {
    const authCtx = useContext(AdminAuthContext);
    return (

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!authCtx.isAuth && <Stack.Screen name='Authentication' component={Authentication} />}
        {authCtx.isAuth && <Stack.Screen name='AdminPanelBottomTab' component={AdminPanelBottomTab} />}
        {/*Event Components*/}
        {authCtx.isAuth && <Stack.Screen name='ManageEvent' component={ManageEvent} />}
        {authCtx.isAuth && <Stack.Screen name='EventSummery' component={EventSummery} />}
        {/*Announcement Components*/}
        {authCtx.isAuth && <Stack.Screen name='ManageAnnouncement' component={ManageAnnouncement} />}
        {authCtx.isAuth && <Stack.Screen name="AnnouncementSummery" component={AnnouncementSummery} />}
        {/*Sankrati Components*/}
        {authCtx.isAuth && <Stack.Screen name="ManageSankranti" component={ManageSankranti} />}
      </Stack.Navigator>
    );
  }
  function AdminPanelBottomTab() {
    return (
      <BottomTab.Navigator screenOptions={{
        headerShown: true,
        headerStyle: {
          height: 30,
          backgroundColor: globalColors.colors.primaryBackground,
          borderBottomWidth: 1,
          borderBottomColor: globalColors.colors.primary200
        },
        headerTintColor: globalColors.colors.primary100,
        tabBarActiveTintColor: globalColors.colors.primary200,
      }}>
        <BottomTab.Screen name='Announcements' component={Announcements} options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="radio" color={color} size={size} />,
          title: 'Announcements',
          headerRight: ({ size }) => <AdminHeader screen='announcements' size={size} />
        }} />
        <BottomTab.Screen name='Events' component={Events} options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
          title: 'Events',
          headerRight: ({ size }) => <AdminHeader screen='events' size={size} />
        }} initialParams={{allInfo:false}}/>{/*initialParams is used to passs intial parameters*/}
        <BottomTab.Screen name='About' component={About} options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="information" color={color} size={size} />,
          title: 'About',
          headerRight: ({ size }) => <AdminHeader screen='about' size={size} />
        }} initialParams={{userType:'admin'}}/>
      </BottomTab.Navigator>
    );
  }

  //UserPanel
  function UserPanel() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserPanelBottomTab" component={UserPanelBottomTab} />
        <Stack.Screen name="NotificationSummery" component={NotificationSummery} />
      </Stack.Navigator>);
  }

  function UserPanelBottomTab() {
    return (
      <BottomTab.Navigator screenOptions={{
        headerShown: true,
        headerStyle: {
          height: 30,
          backgroundColor: globalColors.colors.primaryBackground,
          borderBottomWidth: 1,
          borderBottomColor: globalColors.colors.primary200
        },
        headerTintColor: globalColors.colors.primary100,
        tabBarActiveTintColor: globalColors.colors.primary200,
      }}>
        <BottomTab.Screen name="Notifications" component={Notifications} options={{
          tabBarIcon: ({ color, size }) => <Ionicons name='notifications' color={color} size={size} />,
          headerRight:()=><UserHeader screen="notifications"/>
        }} />

        <BottomTab.Screen name="Sankranti" component={Sankranti} options={{
          title:'Sankranti',
          tabBarIcon: ({ color, size }) => <Ionicons name="people" color={color} size={size} />,

        }}/>

        <BottomTab.Screen name='About' component={About} options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="information" color={color} size={size} />,
          title: 'About',
          headerRight: ({ size }) => <AdminHeader screen='about' size={size} />
        }} initialParams={{userType:'user'}}/>
      </BottomTab.Navigator>
    );
  }


  return (
    <>
      <StatusBar style='light' />
      <AdminAuthProvider>
        <EventContextProvider>
          <AnnouncementContextProvider>
            <NotificationContextProvider>
              <ShowAllEventProvider>
              <ShowAllNoificationProvider>
              <NotificationViewProvider>
              <NavigationContainer>
                <DrawerNavigation />
              </NavigationContainer>
              </NotificationViewProvider>
              </ShowAllNoificationProvider>
              </ShowAllEventProvider>
            </NotificationContextProvider>
          </AnnouncementContextProvider>
        </EventContextProvider>
      </AdminAuthProvider>
    </>
  );
}

