import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import {Controller} from 'react-hook-form';
import {Picker} from "@react-native-picker/picker";

const CustomPicker1 = ({
    control,
    name,
    itemList,
    defaultValue,
}) => {
    // ***Before: set state locally
    // const [Enable , setEnable]  = useState("");
    // ***After: use Controller from react-hook-form | to consistent with CustomInput
    
    const renderItemList = () => {
        return itemList.map((item, key) => {
            return <Picker.Item key = {item} label={item.label} value={item.value} />
        })
    }


    return (
        <Controller
            control={control}
            name={name}
            // // *** to populate in Confirmation screen***
            defaultValue = {defaultValue}
            render={({field: {value, onChange}, fieldState: {error}}) => (
                <>
                
                    <View style={[ styles.container, {borderColor: '#e8e8e8'},]}>
                        {/* <Text style={{fontWeight: 'bold', fontSize: 16}}>{name}</Text> */}
                        <Picker 
                            selectedValue={value}
                            defaultValue = {defaultValue}
                            mode={"dropdown"}
                            // ***Before: update state locally
                            // onValueChange={(itemValue, itemIndex) => {setEnable(itemValue), console.log(itemValue, itemIndex), onChange(itemValue)}}
                           
                            onValueChange={(itemValue, itemIndex) => { onChange(itemValue), console.log(itemValue, itemIndex)}}
                            //style={{ height: 54, marginTop: 10 }}
                        >
                            {renderItemList()}
                           
                        </Picker>
                        
                    </View>
                    {error && (
                        <Text style={{color: 'red', fontStyle: 'italic', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                    )}
                </>
            )}
        />
    );
};


const styles = StyleSheet.create({
    container: {
    //   backgroundColor: 'yellow',
      width: '100%',
      alignSelf: "flex-start",
      // borderColor: '#e8e8e8',
    //   borderColor: '#blue',
    //   borderWidth: 3,
    //   borderRadius: 5,
  
    //   paddingHorizontal: 10,
    //   marginVertical: 15,
    },
  });
  
  export default CustomPicker1;