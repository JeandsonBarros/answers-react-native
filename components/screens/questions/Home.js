import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { getAnswers } from '../../../services/AnswersService';
import { findQuestion, getAllQuestions } from '../../../services/QuestionsService';
import { asToken } from '../../../services/TokenService';
import CardQuestion from '../../layouts/CardQuestion';
import SearchInput from '../../layouts/SearchInput';
import Styles from '../../styles/Styles';
import QuestionsStyles from './QuestionsStyles';


export default function Home({ route, navigation }) {

    const [questions, setQuestions] = useState([]);
    const [inSearch, setInSearch] = useState(false);
    const [visibleLoad, setVisibleLoad] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {

        navigation.addListener('focus', () => {
            setSearch('')
            listQuestions(1)
            setInSearch(false)
        });

        listQuestions(1)

        return () => {
            listQuestions(1)
        }

    }, [])

    async function listQuestions(pageParam) {

        setVisibleLoad(true)

        const data = await getAllQuestions(pageParam)

        setTotalPage(data.total_pages)
        setPage(data.page)

        if (pageParam == 1)
            setQuestions(data.questions)
        else
            setQuestions(questions.concat(data.questions))

        setVisibleLoad(false)

    }

    async function pagination(pageParam = 1) {

        if (search.length > 0) {
            searchQuestion(search, pageParam)

        } else {
            listQuestions(pageParam)
        }

    }

    async function searchQuestion(searchParam, pageParam) {

        setSearch(searchParam)
        setInSearch(true)
        if (searchParam.length > 0) {

            setVisibleLoad(true)

            const data = await findQuestion(searchParam, pageParam)
            setTotalPage(data.total_pages)
            setPage(data.page)

            if (pageParam == 1) {
                setQuestions(data.questions)
            }
            else {
                setQuestions(questions.concat(data.questions))
            }

            return setVisibleLoad(false)

        }

        setQuestions([])

    }

    function mapQuestions(question) {
        return (
            <TouchableOpacity
                key={question.id}
                onPress={() => navigation.navigate("Question", { questionId: question.id })}
            >

                <CardQuestion
                    id={question.id}
                    title={question.user_name + " | " + question.matter}
                    content={question.statement}
                    getQuantity={getAnswers}
                    date={question.createdAt}
                />

            </TouchableOpacity>
        )
    }

    return (
        <View style={Styles.container}>

            <SearchInput
                placeholder='Buscar questão por enunciado'
                value={search}
                onChangeText={text => {
                    searchQuestion(text, 1)
                }}
            />

            {inSearch &&
                <TouchableOpacity
                    onPress={() => {
                        setInSearch(false)
                        setSearch('')
                        listQuestions(1)
                    }}
                    style={Styles.exitSearch}
                >
                    <Text
                        style={Styles.textExiteSearch}>
                        Sair da busca
                    </Text>
                </TouchableOpacity>
            }

            <ScrollView >



                {(!visibleLoad && questions.length == 0) &&
                    <Text style={{ textAlign: 'center', margin: 10 }}>
                        Nem uma questão encontrada.
                    </Text>
                }

                {questions.map(mapQuestions)}

                {visibleLoad && <ActivityIndicator style={{ marginTop: 10 }} size="large" color={'#0AAD7C'} />}

                {totalPage > page && <TouchableOpacity
                    onPress={() => pagination(page + 1)}
                    style={Styles.buttonPagination}
                >
                    <Text style={Styles.textButtonPagination}> Mostrar mais + </Text>

                </TouchableOpacity>}

            </ScrollView>

            <TouchableOpacity
                style={QuestionsStyles.addButton}
                onPress={async () => {
                    const asSetToken = await asToken()
                    asSetToken ? navigation.navigate('AddQuestion') : navigation.navigate("Login")
                }}
            >
                <Svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" fill="#0AAD7C" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <Path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </Svg>
            </TouchableOpacity>

        </View>
    );
}
