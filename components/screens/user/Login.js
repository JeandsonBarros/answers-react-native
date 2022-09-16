import React, { useState } from 'react';
import { Text,  TouchableOpacity, View, ScrollView } from 'react-native';

import { login } from '../../../services/AuthService';
import UserStyles from './UserStyles';
import Styles from '../../styles/Styles';
import TextInputCustom from "../../layouts/TextInputCustom";
import PasswordInput from "../../layouts/PasswordInput";

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

                    <TextInputCustom
                        label="E-mail"
                        onChangeText={setEmail}
                        value={email}
                        placeholder="exemplo@email.com"
                       
                    />

                    <TextInputCustom
                        label="Senha"
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Senha12345"
                        secureTextEntry={true}
                    />

                    <PasswordInput
                        label="Senha"
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Senha12345"
                        secureTextEntry={true}
                    />



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