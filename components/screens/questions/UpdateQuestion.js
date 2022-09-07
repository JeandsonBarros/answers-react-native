import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { putQuestion } from '../../../services/QuestionsService';
import FormQuestion from '../../layouts/FormQuestion';
import Navbar from '../../layouts/Navbar';

function UpdateQuestion({ navigation, route }) {

    const question = route.params['question']

    async function updateQuestion(editedQuestion) {
         const message = await putQuestion(editedQuestion, question.id)
         alert(message+"!")
    }

    return (
       
            <View style={{ flex: 1}}>
 
                <FormQuestion
                    buttonText="Editar"
                    actionButton={updateQuestion}
                    questionUpdate={question}
                />

                <Navbar
                    navigation={navigation}
                    route={route}
                />

            </View>
       
    );
}

export default UpdateQuestion;