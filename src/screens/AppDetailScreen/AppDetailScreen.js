import React, { useState } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	ImageBackground,
	Image,
	StyleSheet
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function AppDetailScreen({ navigation }) {
	const { control, handleSubmit } = useForm();
	const nav = useNavigation();
	const pageTitle = 'About App';

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
					<Text style={{ fontSize: 14, color: '#FFF' }}>{pageTitle}</Text>
					<TouchableOpacity onPress={() => navigation.openDrawer()}>
						<Ionicons name="menu" size={22} color={'#FFF'} />
					</TouchableOpacity>
				</View>
				<View style={styles.root}>
					<Text>This is App Details page</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		padding: 20
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#051C60',
		marginBottom: 10
	},
	text: {
		color: 'gray',
		marginVertical: 10
	},
	link: {
		color: '#FDB075'
	}
});
