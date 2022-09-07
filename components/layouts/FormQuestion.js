import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Styles from '../styles/Styles';

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

                <View style={Styles.viewInput}>
                    <Text style={Styles.labelInput} >Matéria*</Text>
                    <TextInput
                        style={Styles.input}
                        placeholder='Matemática'
                        value={question.matter || ''}
                        onChangeText={text => setStateQuestion(text, 'matter')}
                    />
                </View>

                <View style={Styles.viewInput}>
                    <Text style={Styles.labelInput} >Enunciado*</Text>
                    <TextInput
                        style={Styles.input}
                        placeholder='1+1'
                        value={question.statement || ''}
                        onChangeText={text => setStateQuestion(text, 'statement')}
                    />
                </View>

                <View style={Styles.viewInput}>
                    <Text style={Styles.labelInput} >Resposta (Não é obrigatória)</Text>
                    <TextInput
                        style={Styles.input}
                        placeholder='1+1=2'
                        value={question.answer || ''}
                        onChangeText={text => setStateQuestion(text, 'answer')}
                    />
                </View>

                <TouchableOpacity style={Styles.button} onPress={runActionButton} >
                    <Text style={Styles.textButton} >{buttonText}</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

export default FormQuestion;