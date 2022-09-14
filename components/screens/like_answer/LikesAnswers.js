import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import Navbar from '../../layouts/Navbar';
import CardAnswer from '../../layouts/CardAnswer';
import Styles from "../../styles/Styles";
import { getAnswersLikes } from "../../../services/LikesService"

function LikesAnswers({ route, navigation }) {

    const [answers, setAnswers] = useState([]);

    useEffect(() => {
  
        selectAnswers()
        
    }, [])

    async function selectAnswers() {
        try {
            const data = await getAnswersLikes()
            setAnswers(data.answers)

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <View>
            <ScrollView style={{ height: '100%' }}>

                {
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

            </ScrollView>

            <Navbar
                navigation={navigation}
                route={route}
            />

        </View>
    );
}

export default LikesAnswers;