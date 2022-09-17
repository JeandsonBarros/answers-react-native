import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native';

import { register } from '../../../services/AuthService';
import Styles from '../../styles/Styles';
import UserStyles from './UserStyles';
import TextInputCustom from "../../layouts/TextInputCustom";
import PasswordInput from "../../layouts/PasswordInput";

function UserRegister({ navigation }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loadVisible, setLoadVisible] = useState(false);

    async function registerUser() {

        if (!name)
            return alert("Informe seu nome!")

        if (!email)
            return alert("Informe seu e-mail!")

        if (!password)
            return alert("Informe sua senha!")

        if (!confirmPassword)
            return alert("Confirme a senha!")

        if (password != confirmPassword)
            return alert("Senhas não correspondem!")

        setLoadVisible(true)

        const message = await register(name, email, password)

        if (message == 'Logado') {
            alert('Usuário cadastrado.')
            return navigation.navigate("Home")
        }

        setLoadVisible(false)

        alert(message)

    }

    return (
        <View style={UserStyles.container} >

            <ScrollView style={{ width: '100%' }}>

                <Text style={UserStyles.logo} >
                    Questões <Text style={UserStyles.lastcharacterLogo}>?</Text>
                </Text>



                <View style={UserStyles.form}>

                    <Text style={UserStyles.titleForm} >Cadastre-se</Text>

                    {loadVisible && <ActivityIndicator size="large" color={'#0AAD7C'} />}

                    <TextInputCustom
                        label="Nome"
                        onChangeText={setName}
                        value={name}
                        placeholder="Fulano"
                    />

                    <TextInputCustom
                        label="E-mail"
                        onChangeText={setEmail}
                        value={email}
                        placeholder="exemplo@email.com"

                    />

                    <PasswordInput
                        label="Senha"
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Senha12345"
                    />

                    <PasswordInput
                        label="Confirmar senha"
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        placeholder="Senha12345"
                    />

                    <TouchableOpacity
                        style={Styles.button}
                        onPress={registerUser}
                    >
                        <Text style={Styles.textButton} >Cadastrar-se</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={UserStyles.underlineButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={UserStyles.underlineTextButton} >Entrar</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>

    );
}

export default UserRegister;