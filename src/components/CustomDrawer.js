import React from "react"
import { View, Text, ImageBackground, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'

import { TouchableOpacity } from "react-native-gesture-handler"
import Ionicons from 'react-native-vector-icons/Ionicons'
const CustomDrawer = (props) => {
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}
                contentContainerStyle={{ backgroundColor: "#3B71F3"}}>
                <ImageBackground
                    source={require('../../assets/images/menuBanner.png')}
                    style={{ padding: 10, }}> 
                   
                    <Image
                        source={require('../../assets/images/userIcon.png')}
                        style={{ height: 80, width: 80, alignContent:'flex-start' }}
                        resizeMode="contain"
                    >
                    </Image>    
                    <Text style={{ color: 'yellow', fontSize: 18, fontWeight:'bold', textShadowColor:'#fff' }}>Username</Text>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>

            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    
                    <Text style={{ fontSize: 15, marginLeft: 5 }}>
                        Footer Section
                    </Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

export default CustomDrawer