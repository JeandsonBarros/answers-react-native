import React, { useState } from 'react';
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import StylesLayouts from './StylesLayouts';
import TextInputCustom from "./TextInputCustom";

function ModalAuthentication({ setModalVisible, modalVisible, action }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function runAction() {

        if (!email)
            return alert("Informe seu e-mail!")

        if (!password)
            return alert("Informe sua senha!")

        action(email, password)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={StylesLayouts.centeredView}>

                <View style={StylesLayouts.modalView} >

                    <Text
                        style={{ fontSize: 20, color: "#19242E" }} >
                        Confirmar
                    </Text>

                    <Text >Informe seu e-mail e senha para confirmar.</Text>


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

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            marginTop: 10,
                            width: '90%'
                        }}>

                        <TouchableOpacity
                            style={[StylesLayouts.button, StylesLayouts.buttonClose]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={StylesLayouts.textStyle}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[StylesLayouts.button, StylesLayouts.buttonDeleteAccount]}
                            onPress={runAction}
                        >
                            <Text style={StylesLayouts.textStyle}>Confirmar</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        </Modal>
    );
}

export default ModalAuthentication;