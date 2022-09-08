import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

import { register } from '../../../services/AuthService';
import Styles from '../../styles/Styles';
import UserStyles from './UserStyles';

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

                    <Text style={UserStyles.titleForm} >Cadastro</Text>

                    <View style={Styles.viewInput}>
                        <Text style={Styles.labelInput} >Nome</Text>
                        <TextInput
                            style={Styles.input}
                            placeholder="Fulano"
                            onChangeText={setName}
                        />
                    </View>

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