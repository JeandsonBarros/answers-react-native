import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, TextInput } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { getAnswers } from '../../services/AnswersService';
import { getQuestionsByUser } from '../../services/QuestionsService';
import { asToken } from '../../services/TokenService';
import Card from '../layouts/Card';
import Load from '../layouts/Load';
import Navbar from '../layouts/Navbar';
import StylesScreens from '../styles/StylesScreens';

function QuestionsByUser({ route, navigation }) {

    const [questions, setQuestions] = useState([]);
    const [visibleLoad, setVisibleLoad] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {

        asToken().then(asSetToken => {

            if (asSetToken)
                listQuestions()
            else
                navigation.navigate("Login")

        })

    }, [])

    async function listQuestions() {

        const data = await getQuestionsByUser(1)

        setQuestions(data.questions)
        setVisibleLoad(false)

    }

    async function searchQuestion(param) {

        setSearch(param)

        if (param) {
            const data = await findQuestion(param, 1)
            setQuestions(data.questions)

        } else {
            listQuestions()
        }
    }

    return (
        <View style={StylesScreens.container}>

            <ScrollView style={{ marginBottom: 70 }}>

                <View style={StylesScreens.search}>

                    <Svg style={{ margin: 5 }} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#19242E" class="bi bi-search" viewBox="0 0 16 16">
                        <Path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </Svg>

                    <TextInput
                        placeholder='Buscar questão por enunciado'
                        style={StylesScreens.textInputSearch}
                        value={search}
                        onChangeText={searchQuestion}
                    />

                </View>

                {visibleLoad ? <Load /> : questions.map(question => {
                    return (
                        <TouchableOpacity
                            key={question.id}
                            onPress={() => navigation.navigate("Question", { questionId: question.id })}
                        >

                            <Card

                                id={question.id}
                                title={question.user_name + " | " + question.matter}
                                content={question.statement}
                                getQuantity={getAnswers}
                                icon={
                                    <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#0AAD7C" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                                        <Path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                    </Svg>
                                }
                            />

                        </TouchableOpacity>
                    )
                })}

            </ScrollView>

            <Navbar
                navigation={navigation}
                route={route}
            />

        </View>);
}


export default QuestionsByUser;