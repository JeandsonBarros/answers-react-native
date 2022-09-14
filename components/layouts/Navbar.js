import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { asToken } from '../../services/TokenService';
import Styles from './StylesLayouts';

export default function Navbar({ navigation, route }) {

    const [nameRouter, setNameRouter] = useState(route.name)

    async function navigateAuth(routeName) {
        const asSetToken = await asToken()
        asSetToken? navigation.navigate(routeName) : navigation.navigate("Login")

    }

    return (

        <View style={Styles.navBar}>

            <TouchableOpacity
                style={nameRouter == "Home" ? Styles.buttonNavSelect : Styles.buttonNav}
                onPress={() => { navigation.navigate("Home") }}
            >

                <Svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#EEF7FC" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                    <Path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                </Svg>

            </TouchableOpacity>

            <TouchableOpacity
                style={nameRouter == "QuestionsByUser" ? Styles.buttonNavSelect : Styles.buttonNav}
                onPress={() => { navigateAuth("QuestionsByUser") }}
            >

                <Svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#EEF7FC" class="bi bi-question-square-fill" viewBox="0 0 16 16">
                    <Path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" />
                </Svg>

            </TouchableOpacity>

            <TouchableOpacity
                style={nameRouter == "AnswersByUser" ? Styles.buttonNavSelect : Styles.buttonNav}
                onPress={() => { navigateAuth("AnswersByUser") }}
            >

                <Svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#EEF7FC" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                    <Path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </Svg>

            </TouchableOpacity>

            <TouchableOpacity
                style={nameRouter == "LikesAnswers" ? Styles.buttonNavSelect : Styles.buttonNav}
                onPress={() => { navigateAuth("LikesAnswers") }}
            >

                <Svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#EEF7FC" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <Path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </Svg>

            </TouchableOpacity>

        </View>);
}
