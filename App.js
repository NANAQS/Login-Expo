// In App.js in a new project

import React, {useState} from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function CreateScreen({navigation}) {
  const [createUser, setCreateUser] = React.useState("")
  const [createPassword, setCreatePassword] = React.useState("")
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{borderWidth: 1, height: 40, width: 150, textAlign: 'center', marginBottom: 10}}
        placeholder="Digite seu nome"
        onChangeText={newText => setCreateUser(newText)}
        defaultValue={createUser}
      />
      <TextInput
        style={{borderWidth: 1, height: 40, width: 150, textAlign: 'center', marginBottom: 10}}
        placeholder="Digite sua senha"
        onChangeText={newText => setCreatePassword(newText)}
        defaultValue={createPassword}
      />
      <Button 
      title="Registrar"
      onPress={() => {
        let data = {
          nome: createUser,
          senha: createPassword
        }

        fetch("URL", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify(data)
        }).then((res) => res.json())
        .then((data) => {
          console.log(data)
          navigation.navigate('Details')
        })
        .catch((err) => console.log(err))
      }
      }
      />
    </View>
  )
}

function HomeScreen({ navigation }) {
  const [textUser, setTextUser] = React.useState("");
  const [textPassword, setTextPassword] = React.useState("");
  const [visiblePassword, setvisiblePassword] = React.useState(true);
  const nextButton = async () => {
    const res = await fetch('URL');
    const json = await res.json();
    for (const property in json) {
      //console.log(property + " = " + json[property].senha);
      if(json[property].nome == textUser && json[property].senha == textPassword){
        navigation.navigate('Details');
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        onChangeText={newText => setTextUser(newText)}
        defaultValue={textUser}
      />
      <View
      style={{
        flexDirection: "row",
      }}
      >
      <TextInput
        style={styles.inputPassword}
        placeholder="Digite sua senha"
        secureTextEntry={visiblePassword}
        onChangeText={newText => setTextPassword(newText)}
        defaultValue={textPassword}
      />
      <Button 
        style={{with: 20, height: 20, }}
        title="a"
        onPress={() => {
          if(visiblePassword){
            setvisiblePassword(false)
          }else {
            setvisiblePassword(true)
          }
        }}
      />
      </View>
      <Button
        style={styles.button}
        title="Login"
        onPress={nextButton}
      />
      <Button
        style={styles.button}
        title="Criar conta"
        onPress={() => navigation.navigate('Create')}
      />
    </View>
  );
}
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Create" component={CreateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 160,
    textAlign: 'center',
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
  },
  inputPassword: {
    height: 40,
    textAlign: 'center',
    width: 160,
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    marginLeft: 25
  },
  button: {
    height: 40,
    width: 150
  },
});

export default App;
