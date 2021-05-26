import React, {useState} from 'react';
import {View, TouchableOpacity, SafeAreaView, Platform, StatusBar} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar, Text} from 'react-native-paper';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

const CalendarScreen = () => {
    // can add time here as another text.
    const [items, setItems] = useState({
        '2021-05-26': [{name: 'Family Dinner'}],
        '2021-05-27': [{name: 'React Native workshop'}],
        '2021-05-28': [],
        '2021-05-29': [{name: 'Sample event text'}, {name: 'More sample event text'}]
    });

    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if (!items[strTime]) {
                    items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    };

    //render the time if time is added as another text prop.
    const renderItem = (item) => {
        return (
            <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
                <Card>
                    <Card.Content>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Text style = {{textTransform: 'capitalize',}}>
                                {item.name}
                            </Text>
                            <Avatar.Text labelStyle = {{textTransform: 'capitalize'}} label = {item.name.charAt(0)}/>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{paddingTop: paddingValue, backgroundColor: 'white', flex:1}}>
            <View style={{flex: 1}}>
                <Agenda
                    items = {items}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
};

export default CalendarScreen;