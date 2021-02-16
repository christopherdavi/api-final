import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as Font from 'expo-font';
import { Alert, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { View, Text, Form, Label, Item, Input, Button,Image } from 'native-base';
import { useFormik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      celular: '',
      email: ''
    },

    onSubmit: values => {
      axios
        .post("http://192.168.100.26:3030/donadores/create", {
          nombre: values.nombre,
          apellido: values.apellido,
          celular: values.celular,
          email: values.email,
          latitude:position.latitude,
          longitude:position.longitude

        })
        .then((response) => {
          console.log("fnh", response);
        })
        .catch((err) => {
          throw err;
        });

    },
    

    validate: values => {
      const errors = {};
      if (!values.nombre || values.nombre < 2) errors.nombre = "Nombre inválido";
      if (!values.celular || values.celular < 2) errors.celular = "Número inválido";
      if (!values.email || values.email < 2) errors.email = "correo inválido";
      return errors;
    },

  })
  
  useEffect(() => {
    entryPoint();
    font();
  }, []);

  const save = async() => {
    let user = {
      nombre: values.nombre,
          apellido: values.apellido,
          celular: values.celular,
          email: values.email,
          latitude:position.latitude,
          longitude:position.longitude
    }
    try {
      let usr = JSON.stringify(user)
      await AsyncStorage.setItem((user.nombre).toString(), usr );
      console.log(' Bingo!!!!!')
    } catch (error) {
      alert(error);      
    }
  };
  const loadId = async(key) => {
    try {
      const usr = await AsyncStorage.getItem(key) 
      return usr != null ? JSON.parse(usr) : null;
      console.log(usr)

    } catch (error) {
      alert(error);
    }
  };
  const getAllKey = async () =>{
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys()
      return keys
      console.log(keys)
    } catch (error) {
      console.log(error);
    }
  
  }
 
  const removeId = async(key) => {
    try {
      await AsyncStorage.removeItem(key);      
    } catch (error) {
      console.log(error);
    }
    console.log('Done.')
  }
  const remove = async() => {
    try {
      await AsyncStorage.clear();      
    } catch (error) {
      console.log(error);
    }
    console.log('Done.')
  }
  function getData() {
    getAllKey().then(respose => {
      let key
      key = respose
      console.log(key)
      for (let i = 0; i <= key.length; i++) {
       loadId(key[i]).then( res => {
         console.log(res)
         fetch('http://192.168.100.26:3030/donadores/create', {
           method: 'POST', body:JSON.stringify(res),
           headers: {
             'Content-type': 'application/json'
           }
         })//.then((respons) =>respons.json()).then((responseJson) => {removeId(key[i])})
         .catch( error => console.error(error))
          console.log('Datos Ingresados Exitosa')  
       })      
      }
    })  
  }

  const [position, setPosition] = useState(null);

  const getPosition = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({
      });
      setPosition(coords);
    } catch (error) {
      console.log("getPosition -> error", error);
      setPosition(null);
    }
  };
  const entryPoint = async () => {
    try {
      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        getPosition();
      }
    } catch (error) {
      console.log("getPermissionAndPosition -> error", error);
    }
  };


  const font = async () => {
    if (!fontsLoaded) {
      loadFonts();
    }
  }

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto_medium: require('../assets/fonts/Roboto-Medium.ttf'),
    });
    setFontsLoaded(true);
  }

  console.log(position)

  if (!fontsLoaded) {
    return (<View></View>);
  }

  return (
    <View style={styles.container}>
     
      <Form>
        
        <Text style={styles.title}>Formulario de Donadores</Text>
        <Item error={errors.nombre ? true : false}>
          <Label>Nombre</Label>
          <Input value={values.nombre} onChangeText={text => setFieldValue('nombre', text)} />
          <Text>{errors.nombre ? errors.name : ''}</Text>
        </Item>
        <Item>
          <Label>Apellido</Label>
          <Input value={values.apellido} onChangeText={text => setFieldValue('apellido', text)} />
        </Item>
        <Item error={errors.celular ? true : false}>
          <Label>Celular</Label>
          <Input value={values.celular} onChangeText={text => setFieldValue('celular', text)} />
          <Text>{errors.celular ? errors.celular : ''}</Text>
        </Item>
        <Item error={errors.email ? true : false}>
          <Label>Email</Label>
          <Input value={values.email} onChangeText={text => setFieldValue('email', text)} />
          <Text>{errors.email ? errors.email : ''}</Text>
        </Item>
        <Button onPress={() => Alert.alert('enviado'),handleSubmit} style={styles.botton}>
          <Text>Enviar</Text>
        </Button>
        <Button style={styles.button2} onPress={()=> save()}>
        <Text style={{color:"white"}}>Guardar</Text>
      </Button>
      <Button style={styles.button2} onPress={()=> getData()}>
        <Text style={{color:"white"}}>Subir los datos a la base</Text>
      </Button>
      <Button style={styles.button2} onPress={()=> remove()}>
        <Text style={{color:"white"}}>Borrar</Text>
      </Button>
      </Form>
      {/* <Button onPress={handleSelectImage}> 
          	<Text>Tomar foto</Text>
     	</Button>	 */}
    
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15

  },
  title: {
    textAlign: 'center',

    marginBottom: 5

  },
  botton: {
    textAlign: 'center',
    justifyContent: "center",
    marginTop: 15

  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 20

  },
  button2:{
    backgroundColor:'#575DD9',
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"stretch",
    marginTop:32,
    marginHorizontal:32,
    borderRadius:6,
    paddingHorizontal:32,
    paddingVertical:12
  },

});