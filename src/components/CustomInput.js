import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  referenceRange = [],
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{name}</Text>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              // inputStyle={{color: 'red'}} 
              // style={styles.input}
              // style accroding to if value in referenceRange
              style={value == 0 || (value >= referenceRange[0] && value <= referenceRange[1]) ? styles.input : styles.inputOutRange}
              secureTextEntry={secureTextEntry}
            />
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
    backgroundColor: 'white',
    width: '100%',

    // borderColor: '#e8e8e8',
    borderColor: '#blue',
    borderWidth: 3,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 15,
  },
  input: {
    // backgroundColor: "yellow",
  },

  // How to change Text Color in TextInput ???

  inputOutRange:{
    backgroundColor: "#f7eb07",
    color: "blue",
  }
});

export default CustomInput;