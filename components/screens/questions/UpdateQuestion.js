import { View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

import { putQuestion } from '../../../services/QuestionsService';
import FormQuestion from '../../layouts/FormQuestion';

function UpdateQuestion({ route }) {

    const question = route.params['question']
    const [loadVisible, setLoadVisible] = useState(false);

    async function updateQuestion(editedQuestion) {

        setLoadVisible(true)

        const message = await putQuestion(editedQuestion, question.id)
        alert(message + "!")
    
        setLoadVisible(false)

    }


    return (

        <View style={{ flex: 1 }}>

            {loadVisible && <ActivityIndicator style={{marginTop: 10}} size="large" color={'#0AAD7C'} />}

            <FormQuestion
                buttonText="Editar"
                actionButton={updateQuestion}
                questionUpdate={question}
            />

        </View>

    );
}

export default UpdateQuestion;