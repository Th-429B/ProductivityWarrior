import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_MODS = '@save_modules'
const STORAGE_CAP = '@save_cap'
const STORAGE_MC = '@save_mc'

export const loadData = async (setModulesTaken, setCapTotal, setTotalMC) => {
    try {
        const mods = await AsyncStorage.getItem(STORAGE_MODS);
        const cap = await AsyncStorage.getItem(STORAGE_CAP);
        const mc = await AsyncStorage.getItem(STORAGE_MC);
        const parsedMods = mods ? JSON.parse(mods) : [];
        const parsedCAP = cap ? JSON.parse(cap) : 0;
        const parsedMC = mc ? JSON.parse(mc) : 0;
        setModulesTaken(parsedMods);
        setCapTotal(parsedCAP);
        setTotalMC(parsedMC);
    } catch (error) {
        alert('Error: Unable to load mods.');
        console.log(error);
    }
}

export const saveModules = async (modList) => {
    try {
        AsyncStorage.setItem(STORAGE_MODS, JSON.stringify(modList));
    } catch (error) {
        alert('Error: Unable to save mods.');
        console.log(error);
    }
}

export const saveCAP = async (cap) => {
    try {
        AsyncStorage.setItem(STORAGE_CAP, JSON.stringify(cap));
    } catch (error) {
        alert('Error: Unable to save totalCAP.');
        console.log(error);
    }
}

export const saveMC = async (mc) => {
    try {
        AsyncStorage.setItem(STORAGE_MC, JSON.stringify(mc));
    } catch (error) {
        alert('Error: Unable to save totalMC.');
        console.log(error);
    }
}