import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';

import { deleteAnswer, getAnswers, getOneAnswerByUser, postAnswer, putAnswer } from '../../../services/AnswersService';
import { getQuestion } from '../../../services/QuestionsService';
import { asToken } from '../../../services/TokenService';
import CardQuestion from '../../layouts/CardQuestion';
import CardAnswer from '../../layouts/CardAnswer';
import TextInputCustom from '../../layouts/TextInputCustom';
import Styles from '../../styles/Styles';
import QuestionsStyles from './QuestionsStyles';
import Load from '../../layouts/Load';


export default function Question({ route, navigation }) {

    const { questionId } = route.params

    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState({});
    const [answerByUser, setAnswerByUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [visibleLoad, setVisibleLoad] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

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

        selectAnswers(1)

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

    async function selectAnswers(pageParam) {
        try {
            const data = await getAnswers(questionId, pageParam)
           
            setAnswers(answers.concat(data.answers))

            setPage(data.page)
            setTotalPages(data.total_pages)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View >
            <ScrollView>

                <CardQuestion
                    id={questionId}
                    title={question.user_name + " | " + question.matter}
                    content={question.statement}
                    getQuantity={getAnswers}
                    date={question.createdAt}
                />

                {
                    question.answer ? (<View style={QuestionsStyles.card}>
                        <Text style={QuestionsStyles.title}>Resposta de {question.user_name}</Text>
                        <Text style={QuestionsStyles.statement}>{question.answer}</Text>

                    </View>) : <Text></Text>
                }

                <View style={QuestionsStyles.card}>

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

                            <Text style={QuestionsStyles.title}>
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

                <View style={QuestionsStyles.card}>

                    <Text style={QuestionsStyles.title}>Sugestões de respostas</Text>

                    {
                        answers.map(answer => {
                            return (

                                <CardAnswer
                                    key={answer.id}
                                    id={answer.id}
                                    title={answer.user_name}
                                    content={answer.answer}
                                    date={answer.createdAt}
                                />
                            )
                        })
                    }

                    {(totalPages > page) && <TouchableOpacity
                        style={Styles.buttonPagination}
                        onPress={() => selectAnswers(page + 1)}
                    >
                        <Text style={Styles.textButtonPagination} >Mostrar mais +</Text>
                    </TouchableOpacity>
                    }
                </View>

            </ScrollView>
        </View>);
}

