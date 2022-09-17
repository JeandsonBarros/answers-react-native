import { View, ActivityIndicator } from 'react-native';
import { postQuestion } from '../../../services/QuestionsService';
import FormQuestion from '../../layouts/FormQuestion';
import React, { useState } from 'react';


function AddQuestion({ navigation }) {

    const [loadVisible, setLoadVisible] = useState(false);

    async function saveQuestion(question) {

        setLoadVisible(true)

        const message = await postQuestion(question)
        alert(message);

        if (message == 'Questão salva')
            navigation.navigate('QuestionsByUser')

        setLoadVisible(false)
    }

    return (
        <View style={{ flex: 1 }}>

            {loadVisible && <ActivityIndicator style={{ marginTop: 10 }} size="large" color={'#0AAD7C'} />}

            <FormQuestion
                buttonText='Salvar'
                actionButton={saveQuestion}
            />

        </View>);
}

export default AddQuestion;