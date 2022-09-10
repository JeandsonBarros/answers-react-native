import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { deleteAnswer, getAnswers, getOneAnswerByUser, postAnswer, putAnswer } from '../../../services/AnswersService';
import { getQuantyLikes } from '../../../services/LikesService';
import { getQuestion } from '../../../services/QuestionsService';
import { asToken } from '../../../services/TokenService';
import Card from '../../layouts/Card';
import TextInputCustom from '../../layouts/TextInputCustom';
import Styles from '../../styles/Styles';
import StylesScreens from './QuestionsStyles';

export default function Question({ route, navigation }) {

    const { questionId } = route.params

    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState({});
    const [answerByUser, setAnswerByUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        asToken().then(response => {

            if (response) {
                selectAnswerByUser(questionId)
                setIsAuthenticated(true)
            }
            else {
                setIsAuthenticated(false)
            }

        })

        selectAnswers()

        selectQuestion()

    }, [questionId])

    /* Start Functions for authenticated user suggested response */

    async function selectAnswerByUser() {
        try {
            const data = await getOneAnswerByUser(questionId)
            setAnswerByUser(data)

        } catch (error) {
            console.log(error);
        }
    }

    async function createAnswer() {
        try {
            if (!answerByUser.answer)
                return alert("Não deixe o campo de resposta vazio.")

            const message = await postAnswer(questionId, answerByUser.answer)
            alert(message);

            selectAnswerByUser()
            selectAnswers()

        } catch (error) {
            console.log(error);
        }
    }

    async function updateAnswer() {
        try {

            if (!answerByUser.answer)
                return alert("Não deixe o campo de resposta vazio.")

            const message = await putAnswer(questionId, answerByUser.id, answerByUser.answer)
            alert(message)

            selectAnswerByUser()
            selectAnswers()

        } catch (error) {
            console.log(error);
        }
    }

    async function dropAnswer() {

        Alert.alert(
            'Remover resposta',
            'Realmente deseja remover sua sugestão de resposta?', [
            {
                text: 'Cancelar',
            },
            {
                text: 'remover', onPress: async () => {
                    try {

                        const message = await deleteAnswer(questionId, answerByUser.id)
                        alert(message)

                        selectAnswerByUser()
                        selectAnswers()

                    } catch (error) {

                    }
                }
            },
        ]);

    }

    /* End Functions for authenticated user suggested response */


    async function selectQuestion() {
        try {
            const data = await getQuestion(questionId)
            setQuestion(data)

        } catch (error) {
            console.log(error);
        }
    }

    async function selectAnswers() {
        try {
            const data = await getAnswers(questionId, 1)
            setAnswers(data.answers)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View >
            <ScrollView>

                <Card
                    id={questionId}
                    title={question.user_name + " | " + question.matter}
                    content={question.statement}
                    getQuantity={getAnswers}
                    icon={
                        <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#0AAD7C" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                            <Path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        </Svg>
                    }
                />

                {
                    question.answer ? (<View style={StylesScreens.card}>
                        <Text style={StylesScreens.title}>Resposta de {question.user_name}</Text>
                        <Text style={StylesScreens.statement}>{question.answer}</Text>

                    </View>) : <Text></Text>
                }

                <View style={StylesScreens.card}>

                    {isAuthenticated ?

                        <View style={{
                            width: '100%',
                            justifyContent: 'center',
                        }}>

                            <TextInputCustom
                                value={answerByUser.answer}
                                onChangeText={(text) => {
                                    let answerTemp = { ...answerByUser }
                                    answerTemp.answer = text
                                    setAnswerByUser(answerTemp)
                                }}
                                label='Sua sugestão de resposta'
                                placeholder='Sugestão aqui'
                            />

                            {answerByUser.id ?
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={updateAnswer}
                                        style={Styles.button}>
                                        <Text style={Styles.textButton} >Editar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={dropAnswer}
                                        style={[Styles.button, { backgroundColor: '#ff4040' }]}>
                                        <Text style={Styles.textButton} >Romover</Text>
                                    </TouchableOpacity>
                                </View> :

                                <TouchableOpacity
                                    onPress={createAnswer}
                                    style={Styles.button}>
                                    <Text style={Styles.textButton} >Salvar</Text>
                                </TouchableOpacity>}

                        </View> :

                        <View>

                            <Text style={StylesScreens.title}>
                                Entre ou cadastre-se para deixar uma sugestão de resposta.
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Login')}
                                    style={Styles.button}>
                                    <Text style={Styles.textButton} >Entrar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate('UserRegister')}
                                    style={Styles.button}>
                                    <Text style={Styles.textButton} >Cadastrar-se</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                    }

                </View>

                <View style={StylesScreens.card}>
                    <Text style={StylesScreens.title}>Sugestões de respostas</Text>
                    {
                        answers.map(answer => {
                            return (

                                <Card
                                    key={answer.id}
                                    id={answer.id}
                                    title={answer.user_name}
                                    content={answer.answer}
                                    getQuantity={getQuantyLikes}
                                    icon={
                                        <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#0AAD7C" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <Path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </Svg>
                                    }
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>);
}

