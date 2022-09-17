import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { deleteAccount, logout } from '../../../services/AuthService';

import ModalAuthentication from '../../layouts/ModalAuthentication';
import UserStyles from './UserStyles';

function UserConfig({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);

    async function confirmDelete(email, password) {

        const message = await deleteAccount(email, password)
        alert(message)
        setModalVisible(false)

        navigation.navigate('Home')
    }

    return (
        <View>

            <ModalAuthentication
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                action={confirmDelete}
            />

            <TouchableOpacity
                style={UserStyles.buttonConfig}
                onPress={() => navigation.navigate('UserData')}
            >
                <Svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#19242E" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <Path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <Path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </Svg>

                <Text style={UserStyles.textButtonConfig} >Editar dados da conta</Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={UserStyles.buttonConfig}
                onPress={() => navigation.navigate('UserPassword')}
            >
                <Svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#19242E" class="bi bi-key-fill" viewBox="0 0 16 16">
                    <Path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </Svg>

                <Text style={UserStyles.textButtonConfig} >Senha</Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={UserStyles.buttonConfig}
                onPress={() => setModalVisible(true)}
            >

                <Svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#19242E" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <Path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </Svg>

                <Text style={UserStyles.textButtonConfig} >Deletar conta</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    UserStyles.buttonConfig,
                    {
                        borderTopColor: 'rgb(215, 215, 215)',
                        borderTopWidth: 1,
                    }
                ]}

                onPress={async () => {
                    const logoutStatus = await logout()
                    logoutStatus ? navigation.navigate('Home') : alert("Erro ao deslogar!")
                }}
            >
                <Svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#19242E" class="bi bi-door-open-fill" viewBox="0 0 16 16">
                    <Path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                </Svg>

                <Text style={UserStyles.textButtonConfig} >Sair</Text>

            </TouchableOpacity>

        </View>
    );
}

export default UserConfig;