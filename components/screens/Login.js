import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { login } from '../../services/AuthService';
import Styles from '../styles/Styles';

function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function loginButton() {
        const data = await login(email, password)
       
        if (data === "Logado")
            navigation.navigate("Home")
        else    
            alert(data)
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        >

            <Text style={{ textAlign: 'center', fontSize: 30, margin: 20 }} >
                Questões <Text style={{ color: '#0AAD7C' }}>?</Text>
            </Text>

            <View
                style={{
                    backgroundColor: '#fff',
                    width: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10
                }}>

                <Text style={{ textAlign: 'center', fontSize: 30, margin: 50 }} >Login</Text>

                <TextInput
                    style={Styles.input}
                    placeholder="E-mail"
                    onChangeText={setEmail}
                />

                <TextInput
                    style={Styles.input}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    style={{
                        backgroundColor: '#0AAD7C',
                        borderRadius: 10,
                        width: 100,
                        height: 50,
                        justifyContent: 'center',
                        margin: 30

                    }}
                    onPress={loginButton}
                >
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 30 }} >Entrar</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

export default Login;