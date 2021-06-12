import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = '@event_items'

// let eventData ;
    // = {
//     '2021-05-26': [{name: 'Family Dinner'}],
//         '2021-05-27': [{name: 'React Native workshop'}],
//         '2021-05-28': [],
//         '2021-05-29': [{name: 'Sample event text'}, {name: 'More sample event text'},{name: 'More sample event text'}
//         ,{name: 'More sample event text'},{name: 'More sample event text'},{name: 'More sample event text'}
//         ,{name: 'More sample event text'},{name: 'More sample event text'},{name: 'More sample event text'}
//         ,{name: 'More sample event text'},{name: 'More sample event text'},{name: 'last item'}]
// };

export const loadData = async (setState) => {
    try {
        const items = await AsyncStorage.getItem(STORAGE_KEY);
        // if items is not null, we have to parse the items.
        const parsedItems = items ? JSON.parse(items) : {'2021-05-26': [{name: 'Family Dinner'}],
            '2021-05-27': [{name: 'React Native workshop'}]};
        setState(parsedItems);
    } catch (error) {
        alert('Error: Unable to load tasks.');
        console.log(error);
    }
}

export const saveData = async (eventItems) => {
    try {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(eventItems));
    } catch (error) {
        alert('Error: Unable to save tasks.');
        console.log(error);
    }
}
