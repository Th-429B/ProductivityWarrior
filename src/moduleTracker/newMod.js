import React, {useState} from 'react'
import {
    Keyboard,
    View,
    Text,
    StyleSheet,
    Platform,
    TextInput,
    TouchableOpacity,
    SafeAreaView, StatusBar, Alert
} from "react-native";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {Picker} from '@react-native-picker/picker';

const NewMod = ({modulesStateStorageHelper, modulesTaken, navigation, moduleList, totalMC, mcStateStorageHelper, capTotal, capStateStorageHelper, gradeMap}) => {

    const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0
    const [textInput, setTextInput] = useState(null);
    const [grade, setGrade] = useState('A+');
    const [applySU, setApplySU] = useState(false);
    const [moduleData, setModuleData] = useState(null);
    const [moduleType, setModuleType] = useState("UE");

    const done = () => {
        if (!textInput) {
            Alert.alert('Module code is empty!');
        } else {
            const code = (textInput).toUpperCase()
            //const module = moduleList.filter((mod) => mod['moduleCode'] === code);
            const exist = modulesTaken.filter((mod) => mod['moduleCode'] === code);
            if (!moduleData) {
                Alert.alert('Module not found!');
            } else if (exist.length && exist[0]['grade'] !== 'NA'){
                Alert.alert('Module already exist!')
            } else if (!grade) {
                Alert.alert('Please select your grade!');
            } else {
                if (exist.length && exist[0]['grade'] === 'NA') {
                    const module = exist[0];
                    module['grade'] = grade;
                    module['SU'] = applySU;
                    modulesStateStorageHelper(modulesTaken)
                } else {
                    const newMod = {
                        moduleCode: moduleData['moduleCode'],
                        title: moduleData['title'],
                        description: moduleData['description'],
                        moduleCredit: moduleData['moduleCredit'],
                        department: moduleData['department'],
                        faculty: moduleData['faculty'],
                        grade: grade,
                        SU: applySU,
                        type: moduleData['moduleCode'].startsWith('GE') ? "GE" : moduleType,
                    }

                    const newMods = [...modulesTaken, newMod];
                    modulesStateStorageHelper(newMods);
                }
                if (!applySU && grade !== 'CS' && grade !== 'CU') {
                    const intMC = parseInt(moduleData['moduleCredit'])
                    mcStateStorageHelper(totalMC + intMC);
                    capStateStorageHelper(capTotal + intMC * gradeMap[grade]);
                }

                setTextInput(null);
                setGrade('A+');
                setApplySU(false);
                setModuleData(null);

                Keyboard.dismiss();
                navigation();
            }
        }
    }

    const cancel = () => {
        Keyboard.dismiss();
        navigation();
    }

    const toggleApplySU = () => {
        setApplySU(!applySU);
    }

    const findModule = (modCode) => {
        const code = (modCode).toUpperCase();
        const module = moduleList.filter((mod) => mod['moduleCode'] === code);
        if (module.length) {
            setModuleData(module[0]);
        } else {
            setModuleData(null);
        }
        setApplySU(false);
    }

    const canSU = () => {
        try {
            if ("attributes" in moduleData && "su" in moduleData["attributes"]) {
                return (
                    <TouchableOpacity style={styles.buttonSU} onPress={() => toggleApplySU()}>
                        {showSU()}
                    </TouchableOpacity>
                )
            } else {
                return(
                    <View style={styles.infoText}>
                        <Text>SU option unavailable for this module</Text>
                    </View>
                )
            }
        } catch (err) {
            return(
                <View style={styles.infoText}>
                    <Text>Module not found</Text>
                </View>
            )
        }
    }

    const showSU = () => {
        if (applySU) {
            return (
                <View style={styles.innerButton}>
                    <Text>SU Applied</Text>
                    <MaterialIcons name="check-circle" size={24} color={"#00adf5"} />
                </View>
            )
        } else {
            return (
                <View style={styles.innerButton}>
                    <Text>Apply SU</Text>
                    <MaterialIcons name="radio-button-unchecked" size={24} color={"#00adf5"} />
                </View>
            )
        }
    }

    const showModuleInfo = () => {
        if (moduleData) {
            return (
                <View style={styles.button}>
                    <Text style={styles.subheadingText}>{moduleData["moduleCode"]}</Text>
                    <Text style={styles.infoText}>{moduleData["title"]}</Text>

                </View>
            )
        } else {
            return(
                <View style={styles.infoText}>
                    <Text>Module not found</Text>
                </View>
            )
        }
    }

    return(
        <SafeAreaView style = {styles.safe(paddingValue)}>
            <View style={styles.inner}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => cancel()}>
                        <View style={styles.innerButton}>
                            <Ionicons name="chevron-back" size={24} color="#00adf5" />
                            <Text style={{color: "#00adf5"}}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Add Modules</Text>
                    <TouchableOpacity onPress={() => done()}>
                        <View style={styles.innerButton}>
                            <Text style={{color: "#00adf5"}}>Done</Text>
                            <Ionicons name="checkmark" size={24} color="#00adf5" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.subheading}>
                    <Text style={styles.subheadingText}>Enter Module Code</Text>
                </View>
                <TextInput value={textInput} style={styles.textInput} onChangeText={modCode => {setTextInput(modCode); findModule(modCode)}} placeholder={"Enter module code"} />
                {showModuleInfo()}
                <View style={styles.subheading}>
                    <Text style={styles.subheadingText}>Select Grade</Text>
                </View>
                <Picker
                selectedValue={grade}
                onValueChange={(itemValue) =>
                    setGrade(itemValue)
                }>
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="A" value="A" />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="B" value="B" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="C+" value="C+" />
                    <Picker.Item label="C" value="C" />
                    <Picker.Item label="D+" value="D+" />
                    <Picker.Item label="D" value="D" />
                    <Picker.Item label="F" value="F" />
                    <Picker.Item label="CS" value="CS" />
                    <Picker.Item label="CU" value="CU" />
                    <Picker.Item label="NA" value="NA" />
                </Picker>
                <View style={styles.subheading}>
                    <Text style={styles.subheadingText}>SU Declaration</Text>
                </View>

                {canSU()}

                {/*showModuleType()*/}

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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'white',
        marginVertical: 7,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerButton: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInput: {
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 15,
    },
    footer: {
        paddingTop: 10,
        fontSize: 12,
    },
    subheading: {
      paddingVertical: 15,
    },
    subheadingText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonSU: {
        backgroundColor: 'white',
        marginVertical: 7,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: 1,
    },
    infoText: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
    }
})

export default NewMod