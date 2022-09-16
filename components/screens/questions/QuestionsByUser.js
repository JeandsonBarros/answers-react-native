import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { getAnswers } from '../../../services/AnswersService';
import { deleteQuestion, findQuestionByUser, getQuestionsByUser } from '../../../services/QuestionsService';
import CardQuestion from '../../layouts/CardQuestion';
import Load from '../../layouts/Load';
import Navbar from '../../layouts/Navbar';
import Styles from '../../styles/Styles';
import QuestionsStyles from './QuestionsStyles';
import SearchInput from '../../layouts/SearchInput';

function QuestionsByUser({ route, navigation }) {

    const [questions, setQuestions] = useState([]);
    const [visibleLoad, setVisibleLoad] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {

        navigation.addListener('focus', () => {
            listQuestions(1)
            setSearch('')
            setPage(1)
        });

        listQuestions(1)

    }, [])

    async function listQuestions(pageParam) {

        const data = await getQuestionsByUser(pageParam)
        setTotalPage(data.total_pages)

        if (pageParam == 1)
            setQuestions(data.questions)
        else
            setQuestions(questions.concat(data.questions))

        setVisibleLoad(false)

    }

    async function pagination() {

        const pageTemp = page + 1

        if (pageTemp <= totalPage) {

            setPage(pageTemp)

            if (search.length > 0) {
                searchQuestion(search, pageTemp)

            } else {
                listQuestions(pageTemp)
            }

        }

    }

    async function searchQuestion(searchParam, pageParam) {

        setSearch(searchParam)

        if (searchParam.length > 0) {
            const data = await findQuestionByUser(searchParam, pageParam)
            setTotalPage(data.total_pages)

            if (pageParam == 1)
                setQuestions(data.questions)
            else {
                setQuestions(questions.concat(data.questions))
            }

        } else {

            setPage(1)
            listQuestions(1)
        }
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
                    listQuestions()
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
                    setPage(1)
                    searchQuestion(text, 1)
                }}
            />

            <ScrollView style={{ height: '100%', marginBottom: 70 }}>

                {visibleLoad ?
                    <Load />
                    :
                    questions.map(item => {
                        return (
                            renderItem(item)
                        )
                    })
                }

                {!(page == totalPage) && <TouchableOpacity
                    onPress={pagination}
                    style={{
                        backgroundColor: '#0AAD7C',
                        borderRadius: 10,
                        margin: 15,
                        padding: 10
                    }}
                >
                    <Text style={{
                        color: '#fff',
                        fontSize: 20,
                        textAlign: 'center',
                    }}> Mostrar mais + </Text>

                </TouchableOpacity>}

            </ScrollView>

            {/* {visibleLoad ?
                <Load />
                :
                <FlatList
                    onEndReached={pagination}
                    onEndReachedThreshold={0.1}
                    style={{ marginBottom: 80 }}
                    data={questions}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            }
            */}

            <TouchableOpacity
                style={QuestionsStyles.addButton}
                onPress={() => navigation.navigate('AddQuestion')}
            >
                <Svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" fill="#0AAD7C" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <Path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </Svg>
            </TouchableOpacity>

            <Navbar
                navigation={navigation}
                route={route}
            />

        </View>);
}

export default QuestionsByUser;