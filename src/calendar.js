import React from "react"
import {View, Platform, StatusBar, SafeAreaView} from "react-native";
import {CalendarList} from "react-native-calendars";

function CalendarScreen() {
    const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

    return (
        <SafeAreaView style={{paddingTop: paddingValue, backgroundColor: 'white'}}>
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
        </SafeAreaView>
    );
}

export default CalendarScreen