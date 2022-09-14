import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { asToken } from '../../../services/TokenService';
import { getAnswers } from '../../../services/AnswersService';
import { findQuestion, getAllQuestions } from '../../../services/QuestionsService';
import Card from '../../layouts/Card';
import Load from '../../layouts/Load';
import Navbar from '../../layouts/Navbar';
import StylesScreens from './QuestionsStyles';


export default function Home({ route, navigation }) {

    const [questions, setQuestions] = useState([]);
    const [visibleLoad, setVisibleLoad] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {

        navigation.addListener('focus', () => {
            listQuestions()
        });

        let isMounted = true;

        if (isMounted)
            listQuestions()

        return () => { isMounted = false };

    }, [])

    async function listQuestions() {

        const data = await getAllQuestions(1)

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

                <Text style={StylesScreens.titleHome}>Questões</Text>

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
                                date={question.createdAt}
                            />

                        </TouchableOpacity>
                    )
                })}

            </ScrollView>

            <TouchableOpacity
                style={StylesScreens.addButton}
                onPress={async () => {
                
                    const asSetToken = await asToken()
                    asSetToken? navigation.navigate('AddQuestion') : navigation.navigate("Login")

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
