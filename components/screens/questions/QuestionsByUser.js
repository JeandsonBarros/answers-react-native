import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, FlatList, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { getAnswers } from '../../../services/AnswersService';
import { deleteQuestion, findQuestionByUser, getQuestionsByUser } from '../../../services/QuestionsService';
import CardQuestion from '../../layouts/CardQuestion';
import SearchInput from '../../layouts/SearchInput';
import Styles from '../../styles/Styles';
import QuestionsStyles from './QuestionsStyles';

function QuestionsByUser({ navigation }) {

    const [questions, setQuestions] = useState([]);
    const [visibleLoad, setVisibleLoad] = useState(true);
    const [inSearch, setInSearch] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {

        navigation.addListener('focus', () => {
            setSearch('')
            setInSearch(false)
            listQuestions(1)   
        });

        listQuestions(1)

    }, [])

    async function listQuestions(pageParam) {

        setVisibleLoad(true)

        const data = await getQuestionsByUser(pageParam)
        setTotalPage(data.total_pages)
        setPage(data.page)

        if (pageParam == 1)
            setQuestions(data.questions)
        else
            setQuestions(questions.concat(data.questions))

        setVisibleLoad(false)

    }

    async function pagination(pageParam) {

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

            const data = await findQuestionByUser(searchParam, pageParam)
            setTotalPage(data.total_pages)
            setPage(data.page)

            if (pageParam == 1)
                setQuestions(data.questions)
            else {
                setQuestions(questions.concat(data.questions))
            }

            return setVisibleLoad(false)

        }

        setQuestions([])

    }

    function confirmDelete(id, text) {
        Alert.alert(
            'Deletar questão',
            `Realmente deseja deletar a questão "${text.slice(0, 20)}${text.length > 20 ? '...' : ''}" ?`, [
            {
                text: 'Cancelar',
            },
            {
                text: 'Deletar', onPress: async () => {
                    const message = await deleteQuestion(id)
                    alert(message)

                    search.length > 0 ? searchQuestion(search, 1) : listQuestions(1)
                }
            },
        ]);
    }

    const renderItem = (item) => (
        <View key={item.id} >
            <TouchableOpacity
                onPress={() => navigation.navigate("Question", { questionId: item.id })}
            >

                <CardQuestion
                    id={item.id}
                    title={item.user_name + " | " + item.matter}
                    content={item.statement}
                    getQuantity={getAnswers}
                    date={item.createdAt}
                />

            </TouchableOpacity>

            <View
                style={QuestionsStyles.viewEditAndDelete}>

                <TouchableOpacity
                    onPress={() => navigation.navigate('UpdateQuestion', { question: item })}
                    style={QuestionsStyles.buttonEdit}
                >
                    <Text style={QuestionsStyles.textButon} >Editar</Text>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFF" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <Path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <Path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </Svg>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => confirmDelete(item.id, item.statement)}
                    style={QuestionsStyles.buttonDelete}
                >
                    <Text style={QuestionsStyles.textButon} >Deletar</Text>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <Path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </Svg>
                </TouchableOpacity>

            </View>

        </View>
    );

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

            <ScrollView style={{ height: '100%' }}>

                {(!visibleLoad && questions.length == 0) &&
                    <Text style={{ textAlign: 'center', margin: 10 }}>
                        Nem uma questão encontrada.
                    </Text>
                }

                {questions.map(renderItem)}

                {visibleLoad && <ActivityIndicator style={{ marginTop: 10 }} size="large" color={'#0AAD7C'} />}

                {(totalPage > page) && <TouchableOpacity
                    onPress={() => pagination(page + 1)}
                    style={Styles.buttonPagination}
                >
                    <Text style={Styles.textButtonPagination}>
                        Mostrar mais +
                    </Text>

                </TouchableOpacity>}

            </ScrollView>


            {/* <FlatList
                onEndReached={pagination}
                onEndReachedThreshold={0.1}
                style={{ marginBottom: 80 }}
                data={questions}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />

            {visibleLoad && <ActivityIndicator style={{ marginTop: 10 }} size="large" color={'#0AAD7C'} />}

            */}


            <TouchableOpacity
                style={QuestionsStyles.addButton}
                onPress={() => navigation.navigate('AddQuestion')}
            >
                <Svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" fill="#0AAD7C" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <Path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </Svg>
            </TouchableOpacity>

        </View>);
}

export default QuestionsByUser;