import { useEffect, useState, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Styles from "../../styles/Styles";
import { getUserData } from "../../../services/AuthService"

function UserData({ navigation }) {

    const [name, setName] = useState('')
    const refInput = useRef();

    useEffect(() => {

        getUserData().then(data => {
            setName(data.user.name);
        }).catch(error => console.log(error));

    }, [])

    return (
        <ScrollView>
            <View style={Styles.form}>
                <Text>UserData</Text>

                <View style={Styles.viewInput}>
                    <Text style={Styles.labelInput}>Nome</Text>
                    <TextInput
                        ref={refInput}
                        onFocus={()=>{
                            refInput.current.setNativeProps({style: { borderColor: '#0AAD7C'}});
                        }}
                        value={name}
                        onChangeText={setName}
                        style={Styles.input}
                        placeholder="Fulano"
                    />
                </View>

                <View style={Styles.viewInput}>
                    <Text style={Styles.labelInput}>Senha</Text>
                    <TextInput
                        style={Styles.input}
                        placeholder="Senha12345"
                        secureTextEntry={true}
                        
                    />
                </View>

                <TouchableOpacity style={Styles.button}>
                    <Text style={Styles.textButton}>
                        Editar
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>);
}

export default UserData;