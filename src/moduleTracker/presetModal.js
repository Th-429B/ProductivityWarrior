import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    StatusBar,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {presets} from "./presetData";

const presetModal = ({navigation, modulesTaken, setModulesTaken, moduleList,}) => {

    const loadMods = (arr) => {
        const modulesTest = [];
        let modsNum = arr.length;
        let modsAdded = 0;
        let modsExist = 0;
        let modsNotFound = 0;
        for (let i = 0; i < arr.length; i++) {
            const code = arr[i].toUpperCase()
            const exist = modulesTaken.filter((mod) => mod['moduleCode'] === code);

            if (exist.length === 0) {
                try {
                    const module = moduleList.filter((mod) => mod['moduleCode'] === code);
                    const moduleData = module[0];
                    const newMod = {
                        moduleCode: moduleData['moduleCode'],
                        title: moduleData['title'],
                        description: moduleData['description'],
                        moduleCredit: moduleData['moduleCredit'],
                        department: moduleData['department'],
                        faculty: moduleData['faculty'],
                        grade: "NA",
                        SU: false,
                        type: "core"
                    }
                    modulesTest.push(newMod);
                    modsAdded += 1;
                } catch (e) {
                    alert("invalid module code " + code)
                    modsNotFound += 1;
                }
            } else {
                exist[0]['type'] = "core";
                modsExist += 1;
            }
        }
        const temp = [...modulesTaken, ...modulesTest]
        setModulesTaken(temp)
        navigation()
        console.log(`${modsAdded} of ${modsNum} mods added, ${modsExist} mods already exist, ${modsNotFound} mods not found`);
    }

    const loadPresetMenu = () => {
        return(
            presets.map((item, index) => {
                return <View key={index}>
                    <TouchableOpacity style={styles.button} onPress={() => {loadMods(item.modules)}}>
                        <View style={styles.innerButton}>
                            <Text>{item.major}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        }))
    }

    const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

    return(
        <SafeAreaView style = {styles.safe(paddingValue)}>
            <View style={styles.inner}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation()}>
                        <View style={styles.innerButton}>
                            <Ionicons name="chevron-back" size={24} color="#00adf5" />
                            <Text style={{color: "#00adf5"}}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Load Preset Modules</Text>
                </View>

                {loadPresetMenu()}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: (paddingValue) => ({
        paddingTop: paddingValue,
        flex: 1,
        backgroundColor: '#f2f4f5',
    }),
    inner: {
        backgroundColor: '#f2f4f5',
        paddingBottom: 20,
        paddingTop: 20,
        paddingHorizontal: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flex: 1,
    },
    button: {
        backgroundColor: 'white',
        marginVertical: 7,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'relative',
        left: 30,
    },
    innerButton: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

})

export default presetModal;