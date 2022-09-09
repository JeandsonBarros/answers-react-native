import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

import { register } from '../../../services/AuthService';
import Styles from '../../styles/Styles';
import UserStyles from './UserStyles';
import TextInputCustom from "../../layouts/TextInputCustom";

function UserRegister({ navigation }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function registerUser() {

        if (!name)
            return alert("Informe seu nome!")

        if (!email)
            return alert("Informe seu e-mail!")

        if (!password)
            return alert("Informe sua senha!")

        const message = await register(name, email, password)    

        if (message=='Logado'){
            alert('Usuário cadastrado.')
            return navigation.navigate("Home")
        }

        alert(message)

    }

    return (
        <ScrollView>
            <View style={UserStyles.container} >

                <Text style={UserStyles.logo} >
                    Questões <Text style={UserStyles.lastcharacterLogo}>?</Text>
                </Text>

                <View
                    style={UserStyles.form}>

                  {/*   <Text style={UserStyles.titleForm} >Cadastro</Text> */}

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

                    <TextInputCustom
                        label="Senha"
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Senha12345"
                        secureTextEntry={true}
                    />

                    <TouchableOpacity
                        style={Styles.button}
                        onPress={registerUser}
                    >
                        <Text style={Styles.textButton} >Cadastrar-se</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={UserStyles.underlineButton}
                        onPress={() => navigation.navigate('UserRegister')}
                    >
                        <Text style={UserStyles.underlineTextButton} >Entrar</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </ScrollView>
    );
}

export default UserRegister;