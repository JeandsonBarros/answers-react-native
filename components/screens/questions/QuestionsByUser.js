import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, TextInput, Text, Alert, FlatList } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { getAnswers } from '../../../services/AnswersService';
import { getQuestionsByUser, deleteQuestion, findQuestionByUser } from '../../../services/QuestionsService';
import Card from '../../layouts/Card';
import Load from '../../layouts/Load';
import Navbar from '../../layouts/Navbar';
import StylesScreens from './QuestionsStyles';

function QuestionsByUser({ route, navigation }) {

    const [questions, setQuestions] = useState([]);
    const [visibleLoad, setVisibleLoad] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {

        navigation.addListener('focus', () => listQuestions());

        listQuestions()

    }, [])

    async function listQuestions() {

        const data = await getQuestionsByUser(page)

        setQuestions(data.questions)
        setVisibleLoad(false)

    }

    async function searchQuestion(param) {

        setSearch(param)

        if (param) {
            const data = await findQuestionByUser(param, page)
            setQuestions(data.questions)

        } else {
            listQuestions()
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

    const renderItem = ({ item }) => (
        <View key={item.id} >
            <TouchableOpacity
                onPress={() => navigation.navigate("Question", { questionId: item.id })}
            >

                <Card
                    id={item.id}
                    title={item.user_name + " | " + item.matter}
                    content={item.statement}
                    getQuantity={getAnswers}
                    date={item.createdAt}
                />

            </TouchableOpacity>

            <View
                style={StylesScreens.viewEditAndDelete}>

                <TouchableOpacity
                    onPress={() => navigation.navigate('UpdateQuestion', { question: item })}
                    style={StylesScreens.buttonEdit}
                >
                    <Text style={StylesScreens.textButon} >Editar</Text>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFF" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <Path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <Path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </Svg>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => confirmDelete(item.id, item.statement)}
                    style={StylesScreens.buttonDelete}
                >
                    <Text style={StylesScreens.textButon} >Deletar</Text>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <Path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </Svg>
                </TouchableOpacity>

            </View>

        </View>
    );

    return (
        <View style={StylesScreens.container}>

            {visibleLoad ?
                <Load />
                :
                <FlatList
                    onEndReached={async () => {

                        setPage(page + 1)
                        const data = await getQuestionsByUser(page + 1)
                       
                        if (data.questions.length > 0)
                            setQuestions(questions.concat(data.questions))

                    }}
                    onEndReachedThreshold={0.5}
                    style={{ marginBottom: 70 }}
                    data={questions}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            }

            {/* <ScrollView
                style={{ marginBottom: 70 }}
                
                onScroll={({ nativeEvent }) => {
                     console.log("Y: ", nativeEvent.contentOffset.y);
                     console.log("=========================================");
                }}
            >

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
                        <View key={question.id} >
                            <TouchableOpacity

                                onPress={() => navigation.navigate("Question", { questionId: question.id })}
                            >

                                <Card
                                    id={question.id}
                                    title={question.user_name + " | " + question.matter}
                                    content={question.statement}
                                    getQuantity={getAnswers}
                                    date={question.createdAt}
                                />

                            </TouchableOpacity>

                            <View
                                style={StylesScreens.viewEditAndDelete}>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate('UpdateQuestion', { question: question })}
                                    style={StylesScreens.buttonEdit}
                                >
                                    <Text style={StylesScreens.textButon} >Editar</Text>
                                    <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFF" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <Path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <Path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </Svg>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => confirmDelete(question.id, question.statement)}
                                    style={StylesScreens.buttonDelete}
                                >
                                    <Text style={StylesScreens.textButon} >Deletar</Text>
                                    <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <Path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </Svg>
                                </TouchableOpacity>

                            </View>

                        </View>
                    )
                })}

            </ScrollView> */}

            <TouchableOpacity
                style={StylesScreens.addButton}
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