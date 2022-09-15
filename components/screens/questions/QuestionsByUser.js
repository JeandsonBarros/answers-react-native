import React, { useEffect, useState, PureComponent } from 'react';
import {
    ScrollView,
    TouchableOpacity,
    View,
    TextInput,
    Text,
    Alert,
    FlatList,
    Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { getAnswers } from '../../../services/AnswersService';
import { getQuestionsByUser, deleteQuestion, findQuestionByUser } from '../../../services/QuestionsService';
import Card from '../../layouts/Card';
import Load from '../../layouts/Load';
import Navbar from '../../layouts/Navbar';
import StylesScreens from './QuestionsStyles';


class Question extends PureComponent {

    render() {
        return (
            <View key={this.props.item.id} >
                <TouchableOpacity
                    onPress={() => navigation.navigate("Question", { questionId: this.props.item.id })}
                >

                    <Card
                        id={this.props.item.id}
                        title={this.props.item.user_name + " | " + this.props.item.matter}
                        content={this.props.item.statement}
                        getQuantity={getAnswers}
                        date={this.props.item.createdAt}
                    />

                </TouchableOpacity>

                <View
                    style={StylesScreens.viewEditAndDelete}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('UpdateQuestion', { question: this.props.item })}
                        style={StylesScreens.buttonEdit}
                    >
                        <Text style={StylesScreens.textButon} >Editar</Text>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFF" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <Path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <Path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </Svg>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => confirmDelete(this.props.item.id, this.props.item.statement)}
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
    }
}

function QuestionsByUser({ route, navigation }) {

    const [questions, setQuestions] = useState([]);
    const [questionsSearch, setQuestionsSearch] = useState([]);
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

            <View style={StylesScreens.search}>

                <Svg style={{ margin: 5 }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#19242E" class="bi bi-search" viewBox="0 0 16 16">
                    <Path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </Svg>

                <TextInput
                    placeholder='Buscar questão por enunciado'
                    style={StylesScreens.textInputSearch}
                    value={search}
                    onChangeText={text => {
                        setPage(1)
                        searchQuestion(text, 1)
                    }}
                />

            </View>

            <ScrollView
                style={{
                    height: '100%',
                    marginBottom: 70
                }}>
                {
                    visibleLoad ?
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
           

            {/* <View style={{
                justifyContent: 'center',
                alignItems: 'center',   
                width: '100%',
                marginBottom: 80
            }}>
                <Image
                style={{height: 50, width: 60, padding: 10,}}
                    source={require('../../../assets/loading.gif')}
                />
            </View> */}

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