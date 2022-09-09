import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Styles from "../../styles/Styles";
import { getUserData, putUserData } from "../../../services/AuthService"
import ModalAuthentication from "../../layouts/ModalAuthentication";
import TextInputCustom from "../../layouts/TextInputCustom";

function UserData({ navigation }) {

    const [name, setName] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [email, setEmail] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {

        getUserData().then(data => {
            console.log(data.user);

            setName(data.user.name);
            setEmail(data.user.email);

            const birthday = new Date(data.user.createdAt)
            setCreatedAt(birthday.toLocaleDateString());

        }).catch(error => console.log(error));

    }, [])

    async function updateUser(email, password) {

        const newData = {
            newName: name,
            password: password
        }

        const message = await putUserData(email, newData)
        alert(message)
        setModalVisible(false)

    }

    return (
        <ScrollView>
            <View style={Styles.form}>

                <ModalAuthentication
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    action={updateUser}
                />

                <TextInputCustom
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Exemplo@email.com"
                    editable={false}
                />
                
                <TextInputCustom
                    label="Data da criação"
                    value={createdAt}
                    onChangeText={setEmail}
                    placeholder="dd/mm/aa"
                    editable={false}
                />

                <TextInputCustom
                    label="Nome"
                    value={name}
                    onChangeText={setName}
                    placeholder="Fulano"
                />

                <TouchableOpacity
                    onPress={() => {

                        if (!name)
                            return alert("Informe um nome!")

                        setModalVisible(true)
                    }}
                    style={Styles.button}>
                    <Text style={Styles.textButton}>
                        Editar
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>);
}

export default UserData;