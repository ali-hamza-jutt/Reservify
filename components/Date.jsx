import React, {useState} from "react";
import {Text, View} from "react-native";

import DatePicker from "@dietime/react-native-date-picker";

export default function Date() {
    const [date, setDate] = useState();

    return (
        <View>
            <Text>{date ? date.toDateString() : "Select date..."}</Text>
            <DatePicker
                value={date}
                onChange={(value) => setDate(value)}
                format="yyyy-mm-dd"
            />
        </View>
    );
}