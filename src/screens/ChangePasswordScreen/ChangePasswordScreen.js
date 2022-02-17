import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground, Image, StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function ChangePasswordScreen({ navigation }) {
    const { control, handleSubmit } = useForm();
    const nav = useNavigation();
    const pageTitle = "Change Password";

    const onSendPressed = data => {
        console.warn(data);
        nav.navigate('HomeScreen');
    };

    const onSignInPress = () => {
        nav.navigate('SignIn');
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 15,
                        backgroundColor: '#678cf8'
                    }}
                >
                    <Text style={{ fontSize: 14, color: '#FFF' }}>
                        { pageTitle}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>

                        <Ionicons name="menu" size={22} color={'#FFF'} />
                    </TouchableOpacity>

                </View>
                <View style={styles.root}>
                   
                    <CustomInput
                        name="username"
                        control={control}
                        placeholder="Username"
                        rules={{
                            required: 'Username is required',
                        }}
                        autoFocus={true}
                    />
                    <CustomInput
                        placeholder="Enter Current password"
                        name="currentPassword"
                        control={control}
                        secureTextEntry
                        rules={{
                            required: 'Current Password is required',
                        }}
                    />
                    <CustomInput
                        placeholder="Enter new password"
                        name="newPassword"
                        control={control}
                        secureTextEntry
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password should be at least 8 characters long',
                            },
                        }}
                    />
                    <CustomButton text="Change" onPress={handleSubmit(onSendPressed)} />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#051C60',
        marginBottom:10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
});

