import React from 'react';
import {StyleSheet,View,ScrollView,Text, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from '../components/FirebaseConfig'
const HomeStack = createStackNavigator();
function HistoryStack(){
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    var [data1, setData] = React.useState([]);
    // db.collection("User").doc(user.uid).collection("Step").onSnapshot((snap) =>{
    //     const datas = [];
    //     snap.forEach( 
    //         doc =>{
    //             doc.ref.collection("Log").get().then(snapLog=>{
    //                 snapLog.forEach( aa=>{
    //                     datas.push({
    //                         message: aa.data().Message,
    //                         step: aa.data().Step,
    //                         time: aa.data().Time,
    //                     })
    //                 })
    //                 setData(datas);
    //             },
    //         error => {
    //             console.log(error)
    //         }
    //         )
    //     })
    //  })
    return(
        <View>
            <ScrollView>
                {
                    data1.map((item, index) => (
                     <View key = {item.time} style = {styles.item}>
                        <Text>{item.message + " " + item.time + " with "+String(item.step) +" steps"}</Text>
                     </View>
                  ))
               }
            </ScrollView>
        </View>
    );
};

export default function HistoryScreen({navigation}) {
	return (
		<HomeStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#CDC9A5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <HomeStack.Screen name="Historysc" component={HistoryStack} options={{
            title:'History',
            headerLeft: () => (
                <Icon.Button name="history" size={25} backgroundColor="#CDC9A5" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
        </HomeStack.Navigator>
	);
}
const styles = StyleSheet.create({
    container:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    imageBackground: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	  },
    item: {
    alignItems:'center',
    backgroundColor:'white',
    justifyContent:'space-between',
    margin:5,
    borderRadius: 10,
    shadowColor: "black",
    padding:25,
    shadowOffset: {
    width: -5,
    height: 6,
    },
    shadowOpacity: 0.23,
    elevation: 4,
    },
})
