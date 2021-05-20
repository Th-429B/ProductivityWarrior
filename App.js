import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Agenda, Calendar, CalendarList} from 'react-native-calendars'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons, AntDesign} from '@expo/vector-icons';


function CalendarScreen() {
    return (
        <View stlye={{marginTop: 10, marginBottom: 10}}>
            <CalendarList
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => {
                    console.log('now these months are visible', months);
                }}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
            />
        </View>
    );
}



function TodoListScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Add TodoList here!</Text>
        </View>
    );
}

function TrackerScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Add Mod and Cap Tracker here!</Text>
        </View>
    );
}

function FunScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Add AntiDistraction app here!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Calendar') {
                        iconName =  'calendar';
                    } else if (route.name === 'Todo-List') {
                        iconName = 'clockcircleo';
                    } else if (route.name === 'Tracker') {
                        iconName = 'book';
                    } else if (route.name === 'FUN!') {
                        iconName = 'smileo';
                    }

                    // You can return any component that you like here!
                    return <AntDesign name= {iconName} size={24} color="black"/>;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >

            <Tab.Screen name="Calendar" component={CalendarScreen}/>
            <Tab.Screen name="Todo-List" component={TodoListScreen}/>
            <Tab.Screen name="Tracker" component={TrackerScreen} />
            <Tab.Screen name="FUN!" component={FunScreen} />

        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10
    },
    month: {
        marginLeft: 5
    },
    year: {
        marginRight: 5
    }
});
