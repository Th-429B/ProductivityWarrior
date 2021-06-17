import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = '@save_modules'

export const loadModules = async (setState) => {
    try {
        const tasks = await AsyncStorage.getItem(STORAGE_KEY);
        const parsedTasks = tasks ? JSON.parse(tasks) : [];
        parsedTasks.map((item) => item['created'] = new Date(item['created']));
        setState(parsedTasks);
    } catch (error) {
        alert('Error: Unable to load tasks.');
        console.log(error);
    }
}

export const saveModules = async (taskList) => {
    try {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
    } catch (error) {
        alert('Error: Unable to save tasks.');
        console.log(error);
    }
}