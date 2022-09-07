import React, { useState } from 'react';
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Styles from '../styles/Styles';
import StylesLayouts from './StylesLayouts';

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
                        Deletar conta
                    </Text>

                    <Text >Informe seu e-mail e senha para confirmar.</Text>

                    <View style={Styles.viewInput} >
                        <Text style={Styles.labelInput} >E-mail</Text>
                        <TextInput
                            onChangeText={setEmail}
                            placeholder="exemplo@email.com"
                            style={Styles.input} />
                    </View>

                    <View style={Styles.viewInput} >
                        <Text style={Styles.labelInput} >Senha</Text>
                        <TextInput
                            onChangeText={setPassword}
                            placeholder="Senha12345"
                            secureTextEntry={true}
                            style={Styles.input} />
                    </View>

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
                            <Text style={StylesLayouts.textStyle}>Deletar</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        </Modal>
    );
}

export default ModalAuthentication;