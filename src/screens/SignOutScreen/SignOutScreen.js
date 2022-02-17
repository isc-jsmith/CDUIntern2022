import React, { useState, Component, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
export default function SignOutScreen() {
    const navigation = useNavigation();
    const [onLoadText] = useState("");
    const onScreenLoad = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'SignInScreen' },
                    {
                        name: 'SignInScreen',
                    },
                ],
            })
        );
    }
    useEffect(() => {
        // write your code here, it's like componentWillMount
        onScreenLoad();
    }, [])

    return (
        <View>
            <Text>{onLoadText}</Text>
        </View>
    );
}



