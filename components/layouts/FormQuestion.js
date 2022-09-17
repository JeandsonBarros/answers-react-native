import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import Styles from '../styles/Styles';
import TextInputCustom from './TextInputCustom';

function FormQuestion({ buttonText, actionButton, questionUpdate }) {


    const [question, setQuestion] = useState(questionUpdate || {});

    function setStateQuestion(param, chave) {

        let temp = question
        temp[chave] = param
        setQuestion({ ...temp })

    }

    function runActionButton() {

        if (!question.matter)
            return alert("Informe uma matéria!")

        if (!question.statement)
            return alert("Informe o enunciado da questão!")

        actionButton(question)
    }

    return (
        <ScrollView>
            <View style={Styles.form}>

                <TextInputCustom
                    label="Matéria*"
                    onChangeText={text => setStateQuestion(text, 'matter')}
                    value={question.matter || ''}
                    placeholder="Matemática"
                />

                <TextInputCustom
                    label="Enunciado*"
                    onChangeText={text => setStateQuestion(text, 'statement')}
                    value={question.statement || ''}
                    placeholder="1+1"
                />
                
                <TextInputCustom
                    label="Resposta (Não é obrigatória)"
                    placeholder='1+1=2'
                    value={question.answer || ''}
                    onChangeText={text => setStateQuestion(text, 'answer')}
                />

                <TouchableOpacity style={Styles.button} onPress={runActionButton} >
                    <Text style={Styles.textButton} >{buttonText}</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

export default FormQuestion;