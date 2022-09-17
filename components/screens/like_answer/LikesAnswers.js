import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Navbar from '../../layouts/Navbar';
import CardAnswer from '../../layouts/CardAnswer';
import Styles from "../../styles/Styles";
import { getAnswersLikes } from "../../../services/LikesService"


function LikesAnswers({ route, navigation }) {

    const [answers, setAnswers] = useState([]);
    const [visibleLoad, setVisibleLoad] = useState(true);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {

        selectAnswers(1)

    }, [])

    async function selectAnswers(pageParam) {

        try {
            const data = await getAnswersLikes(pageParam)

            setAnswers(answers.concat(data.answers))
            setPage(data.page)
            setTotalPage(data.total_pages)

            setVisibleLoad(false)

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <View style={Styles.container}>
            <ScrollView style={{ height: '100%', marginBottom: 70 }}>

                {visibleLoad ?
                    <ActivityIndicator style={{ marginTop: 10 }} size="large" color={'#0AAD7C'} />
                    :
                    answers.map(answer => {
                        return (
                            <TouchableOpacity
                                key={answer.id}
                                onPress={() => navigation.navigate("Question", { questionId: answer.questionId })}
                            >
                                <CardAnswer

                                    id={answer.id}
                                    title={answer.user_name}
                                    content={answer.answer}
                                    date={answer.createdAt}
                                />
                            </TouchableOpacity>
                        )
                    })
                }

                {(totalPage > page) &&
                    <TouchableOpacity
                        onPress={() => selectAnswers(page + 1)}
                        style={Styles.buttonPagination}>
                        <Text style={Styles.textButtonPagination}>
                            Mostrar mais +
                        </Text>
                    </TouchableOpacity>}

            </ScrollView>

            <Navbar
                navigation={navigation}
                route={route}
            />

        </View>
    );
}

export default LikesAnswers;