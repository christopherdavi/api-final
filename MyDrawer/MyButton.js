import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import * as navigation from './navigation'

export default function MyButton({nombre, destino}) {
    return(
    <TouchableOpacity style={{ marginTop: 20, width: 200, height: 50, backgroundColor: '#ff5202', padding: 10, alignItems: 'center', borderRadius: 5 }}
                onPress={() => navigation.navigate(destino)}>
                <Text style={{ fontSize: 20, color: '#fff' }}>{nombre}</Text>
            </TouchableOpacity>
                )
            }
            