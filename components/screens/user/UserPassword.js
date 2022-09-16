import { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Styles from "../../styles/Styles";
import { putUserData } from "../../../services/AuthService"
import ModalAuthentication from "../../layouts/ModalAuthentication";
import TextInputCustom from "../../layouts/TextInputCustom";

function UserPassword({ navigation }) {

    const [newPassword, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    async function updatePassword(email, password) {

        const newData = {
            newPassword: newPassword,
            password: password
        }

        const message = await putUserData(email, newData)

        if (message == "Usuário editado") {
            alert("Senha editada!")
            return setModalVisible(false)
        }

        alert(message)
        setModalVisible(false)

    }

    function valide() {

        if (!newPassword)
            return alert("Informe uma nova senha!")

        if (!confirmPassword)
            return alert("Confirme a nova senha!")

        if (newPassword != confirmPassword)
            return alert("Senhas não correspondem!")

        setModalVisible(true)
    }

    return (
        <ScrollView>
            <View style={Styles.form}>

                <ModalAuthentication
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    action={updatePassword}
                />

                <TextInputCustom
                    label="Nova senha"
                    onChangeText={setPassword}
                    value={newPassword}
                    placeholder="Senha12345"
                    secureTextEntry={true}
                />

                <TextInputCustom
                    label="Confirmar senha"
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    placeholder="Senha12345"
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    onPress={valide}
                    style={Styles.button}>
                    <Text style={Styles.textButton}>
                        Editar senha
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>);
}

export default UserPassword;