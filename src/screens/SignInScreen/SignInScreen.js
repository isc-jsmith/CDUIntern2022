import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
    TextInput,
} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

const SignInScreen = () => {
    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSignInPressed = data => {
        //console.log(data);
        // validate user
        navigation.navigate('HomeScreen');
    };

    // const onForgotPasswordPressed = () => {
    //     navigation.navigate('ForgotPassword');
        
    // };

    const onForgotPasswordPressed = () => navigation.reset({
        index: 0,
        routes: [
            {
                name: 'ForgotPassword',
            },
        ],
    })  



    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height * 0.20 }]}
                    resizeMode="contain"
                />

                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{ required: 'Username is required' }}
                    defaultValue="ananda"
                />

                <CustomInput
                    autoFocus={true}
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    control={control}
                    defaultValue="ananda"
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 3,
                            message: 'Password should be minimum 3 characters long',
                        },
                    }}
                /> 


                <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />

                <CustomButton
                    text="Forgot password?"
                    onPress={onForgotPasswordPressed}
                    type="TERTIARY"
                />
                <CustomButton
                    text="Create New Account?"
                    onPress={onSignUpPressed}
                    type="SECONDARY"
                />

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '180%',
        maxWidth: 400,
        maxHeight: 300,
        marginBottom:20
    },
});

export default SignInScreen;
