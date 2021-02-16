import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Button, StyleSheet } from 'react-native';
import MyButton from './MyButton'

export default function Home(props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Home </Text>
            <MyButton nombre='Ir a Formulario' destino='Formulario'/>
        </View>
    );
}
