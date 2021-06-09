import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {AntDesign} from "@expo/vector-icons";
import React from "react";
import CalendarScreen from "./calendar/calendar"
import TodoListScreen from "./todo/todolist"
import TrackerScreen from "./tracker"
import ProductivityScreen from "./productivity"

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color}) => {
                    let iconName;

                    if (route.name === 'Calendar') {
                        iconName =  'calendar';
                    } else if (route.name === 'Todo-List') {
                        iconName = 'clockcircleo';
                    } else if (route.name === 'Tracker') {
                        iconName = 'book';
                    } else if (route.name === 'Productivity') {
                        iconName = 'smileo';
                    }

                    // You can return any component that you like here!
                    return <AntDesign name= {iconName} size={24} color={color}/>;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                labelStyle: {
                    fontSize: 12,
                },
            }}
        >

            <Tab.Screen name="Calendar" component={CalendarScreen}/>
            <Tab.Screen name="Todo-List" component={TodoListScreen}/>
            <Tab.Screen name="Tracker" component={TrackerScreen} />
            <Tab.Screen name="Productivity" component={ProductivityScreen} />

        </Tab.Navigator>
    );
}

export default MyTabs