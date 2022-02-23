import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AlertSettingScreen from '../screens/AlertSettingScreen/AlertSettingScreen';
import AppDetailScreen from '../screens/AppDetailScreen/AppDetailScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen/ChangePasswordScreen';
import SignOutScreen from '../screens/SignOutScreen/SignOutScreen';
import VitalSignInputScreen from '../screens/VitalSignInputScreen/VitalSignInputScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen/ConfirmationScreen';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="SignIn" component={SignInScreen} />
				<Stack.Screen name="SignUp" component={SignUpScreen} />
				<Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
				<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
				<Stack.Screen name="NewPassword" component={NewPasswordScreen} />
				<Stack.Screen name="HomeScreen" component={DrawerRoutes} />
				<Stack.Screen name="VitalSignInputScreen" component={VitalSignInputScreen} />
				<Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const DrawerRoutes = () => {
	return (
		<Drawer.Navigator
			initialRouteName="HomeScreen"
			screenOptions={{ headerShown: false }}
			drawerContent={(props) => <CustomDrawer {...props} />}
			screenOptions={{
				headerShown: false,
				drawerActiveBackgroundColor: '#3B71F3',
				drawerActiveTintColor: '#fff',
				drawerInactiveTintColor: '#333',
				drawerLabelStyle: {
					marginLeft: -15,
					fontSize: 15
				}
			}}
		>
			<Drawer.Screen
				name="Home"
				component={HomeScreen}
				options={{
					drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />
				}}
			/>
			<Drawer.Screen
				name="Change Password"
				component={ChangePasswordScreen}
				options={{
					drawerIcon: ({ color }) => <Ionicons name="lock-closed" size={22} color={color} />
				}}
			/>
			<Drawer.Screen
				name="Set Alerts"
				component={AlertSettingScreen}
				options={{
					drawerIcon: ({ color }) => <Ionicons name="timer-outline" size={22} color={color} />
				}}
			/>
			<Drawer.Screen
				name="App Details"
				component={AppDetailScreen}
				options={{
					drawerIcon: ({ color }) => <Ionicons name="information-circle" size={22} color={color} />
				}}
			/>
			<Drawer.Screen
				name="Sign Out"
				component={SignOutScreen}
				options={{
					drawerIcon: ({ color }) => <Ionicons name="exit" size={22} color={color} />
				}}
			/>
		</Drawer.Navigator>
	);
};
export default Navigation;
