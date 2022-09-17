import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { asToken } from '../../../services/TokenService';
import { getAnswers } from '../../../services/AnswersService';
import { findQuestion, getAllQuestions } from '../../../services/QuestionsService';
import CardQuestion from '../../layouts/CardQuestion';
import Navbar from '../../layouts/Navbar';
import QuestionsStyles from './QuestionsStyles';
import SearchInput from '../../layouts/SearchInput';
import Styles from '../../styles/Styles';


export default function Home({ route, navigation }) {

    const [questions, setQuestions] = useState([]);
    const [questionsSearch, setQuestionsSearch] = useState([]);
    const [visibleLoad, setVisibleLoad] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {

        navigation.addListener('focus', () => {
            search.length > 0 ? searchQuestion(search, 1) : listQuestions(1)
        });

        search.length > 0 ? searchQuestion(search, 1) : listQuestions(1)

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

        if (searchParam.length > 0) {

            setVisibleLoad(true)

            const data = await findQuestion(searchParam, pageParam)
            setTotalPage(data.total_pages)
            setPage(data.page)

            if (pageParam == 1) {
                setQuestionsSearch(data.questions)
            }
            else {
                setQuestionsSearch(questions.concat(data.questions))
            }

            return setVisibleLoad(false)

        }

        await listQuestions(1)

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

            <ScrollView style={{ marginBottom: 70 }}>

                <Text style={QuestionsStyles.titleHome}>Questões</Text>

                {search.length > 0 ? questionsSearch.map(mapQuestions) : questions.map(mapQuestions)}

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

            <Navbar
                navigation={navigation}
                route={route}
            />

            <StatusBar style="auto" />

        </View>
    );
}
