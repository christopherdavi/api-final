import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Button, StyleSheet } from 'react-native';
import { navigationRef } from '../MyDrawer/navigation';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/FontAwesome"
import s from '../MyScreens/style'
import Home from '../MyDrawer/Home'
import Formulario from '../MyDrawer/Formulario'
import Table from '../MyDrawer/Table'
import Mapa from '../MyDrawer/Mapa'

function DrawerMenu(props) {
    return (
        <TouchableOpacity onPress={props.navigation}>
            <View style={s.menuContainer}>
                <View style={s.iconoContainer}>
                    <Icon size={17} name={props.iconName} />
                </View>
                <View style={s.tituloContainer}>
                    <Text style={s.tituloTxt}>{props.titleName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

function Menu(props) {
    return (
        <View style={s.container}>
            <View style={s.bgContainer}>
                <TouchableOpacity>
                    <View style={s.userContainer}>

                    </View>
                    <View style={s.userNombre}>
                        <Text style={s.userTitulo}>Proyecto NUR</Text>
                        <Text style={s.userSubTitulo}>Ver Home</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerMenu iconName='home' titleName='Home' navigation={() => props.navigation.navigate('Home')} />
            <DrawerMenu iconName='user' titleName='Formulario' navigation={() => props.navigation.navigate('Formulario')} />
            <DrawerMenu iconName='table' titleName='Table' navigation={() => props.navigation.navigate('Table')} />
            <DrawerMenu iconName='bell' titleName='Mapa' navigation={() => props.navigation.navigate('Mapa')} />
        </View>
    )
}

const Drawer = createDrawerNavigator()
function MyDrawer() {
    return (
        <NavigationContainer  ref={navigationRef} >
            <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Formulario" component={Formulario} />
                <Drawer.Screen name="Mapa" component={Mapa} />
                <Drawer.Screen name="Table" component={Table} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}


export default MyDrawer;
