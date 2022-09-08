import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

import { login } from '../../../services/AuthService';
import UserStyles from './UserStyles';
import Styles from '../../styles/Styles';

function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function loginButton() {

        if (!email)
            return alert("Informe seu e-mail!")

        if (!password)
            return alert("Informe sua senha!")

        const data = await login(email, password)

        if (data === "Logado")
            navigation.navigate("Home")
        else
            alert(data)
    }

    return (
        <ScrollView>
            <View style={UserStyles.container} >

                <Text style={UserStyles.logo} >
                    Questões <Text style={UserStyles.lastcharacterLogo}>?</Text>
                </Text>

                <View
                    style={UserStyles.form}>

                    <Text style={UserStyles.titleForm} >Login</Text>

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
                        style={Styles.button}
                        onPress={loginButton}
                    >
                        <Text style={Styles.textButton} >Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={UserStyles.underlineButton}
                        onPress={() => navigation.navigate('UserRegister')}
                    >
                        <Text style={UserStyles.underlineTextButton} >Cadastre-se</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </ScrollView>
    );
}

export default Login;