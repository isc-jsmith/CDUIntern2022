import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
// import {Controller} from 'react-hook-form';
import {Picker} from "@react-native-picker/picker";
// import { Button, Menu, Divider, Provider } from 'react-native-paper';

const DropDownMenu = ({name}) => {
    const [Enable , setEnable]  = useState("");
    return (
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{name}</Text>
            <Picker
                selectedValue={Enable}
                // style={{ height: 50, width: 250 }}
                mode={"dialog"}
                onValueChange={(itemValue) => setEnable(itemValue)}
            >
                <Picker.Item label="A" value="A" />
                <Picker.Item label="B" value="B" />
                <Picker.Item label="C" value="C" />
            </Picker>
        </View>
    );
    };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    // borderColor: '#blue',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 15,
  },
  input: {},
});

export default DropDownMenu;