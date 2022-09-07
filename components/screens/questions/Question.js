import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'

import Card from '../../layouts/Card';
import Svg, { Path } from 'react-native-svg';
import StylesScreens from './QuestionsStyles';
import { getAnswers } from '../../../services/AnswersService';
import { getQuestion } from '../../../services/QuestionsService';
import { getQuantyLikes } from '../../../services/LikesService';

export default function Question({ route, navigation }) {

    const { questionId } = route.params

    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState({});

    useEffect(() => {

        getAnswers(questionId, 1).then(data => {
            setAnswers(data.answers)
        })

        getQuestion(questionId).then(data => {
            setQuestion(data)
        })

    }, [questionId])


    return (
        <View >

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

        </View>);
}

