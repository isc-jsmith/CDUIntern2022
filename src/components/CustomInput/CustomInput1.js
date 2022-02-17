import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

const CustomInput1 = ({
  control,
  name,
  rules = {},
  defaultValue,
  referenceRange = [],
}) => {
  return (
    <Controller
      control={control}
      name={name}
      // // *** to populate in Confirmation screen***
      defaultValue = {defaultValue}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={defaultValue}
              // ***style accroding to if value in referenceRange
              style={(value < referenceRange[0] || value > referenceRange[1]) ? styles.inputOutRange : styles.input}
              keyboardType = 'numeric'
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
    width: '100%',
  },
  input: {
    color: "blue",
    paddingLeft: 18,
  },

  inputOutRange:{
    // backgroundColor: "#f7eb07",
    color: "red",
    paddingLeft: 18,
  }
});

export default CustomInput1;