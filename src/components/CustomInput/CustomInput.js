import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomInput = ({
    control,
    name,
    autoFocus,
    rules = {},
    placeholder,
    secureTextEntry,
    defaultValue,
    referenceRange = [],
    showName,
    keyboardType,
}) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            defaultValue = {defaultValue}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <>
                    <View
                        style={[
                            styles.container,
                            { borderColor: error ? 'red' : '#e8e8e8' },
                        ]}>
                        {showName && (
                            <Text>{showName}</Text>
                        )}
                        <TextInput
                            autoFocus={autoFocus}
                            value={value}
                            defaultValue = {defaultValue}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            style={(value < referenceRange[0] || value > referenceRange[1]) ? styles.inputOutRange : styles.input}
                            secureTextEntry={secureTextEntry}
                            keyboardType={keyboardType}
                        />
                    </View>
                    {error && (
                        <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>
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

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {},
});

export default CustomInput;
