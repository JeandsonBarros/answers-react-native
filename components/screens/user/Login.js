import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

import { login } from '../../../services/AuthService';
import UserStyles from './UserStyles';
import Styles from '../../styles/Styles';

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
        <ScrollView>
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

                    <Text style={{ textAlign: 'center', fontSize: 30, margin: 20 }} >Login</Text>

                    <View style={Styles.viewInput}>
                        <Text style={Styles.labelInput} >E-mail</Text>
                        <TextInput
                            style={Styles.input}
                            placeholder="exemplo@email.com"
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={Styles.viewInput}>
                        <Text style={Styles.labelInput} >Senha</Text>
                        <TextInput
                            style={Styles.input}
                            placeholder="Senha1234"
                            secureTextEntry={true}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#0AAD7C',
                            borderRadius: 10,
                            padding: 10,
                            justifyContent: 'center',
                            margin: 30

                        }}
                        onPress={loginButton}
                    >
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 25 }} >Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            margin: 10,
                            marginBottom: 30
                        }}
                        onPress={() => navigation.navigate('UserRegister')}
                    >
                        <Text style={{ color: '#19242E', textAlign: 'center', fontSize: 20, textDecorationLine: 'underline' }} >Cadastre-se</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </ScrollView>
    );
}

export default Login;