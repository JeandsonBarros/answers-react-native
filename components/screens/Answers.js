
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function Answers({route, navigation }) {

    const {questionId} = route.params

    const [answers, setAnswers] = useState([]);

    useEffect(() => {
       
        fetch('https://api-suas-questoes.herokuapp.com/answers/'+questionId+'/?page=1')

            .then(response => {
                response.json().then(data => {
                    
                    setAnswers(data.answers)
                })

            })


    }, [])

    return (
        <View style={styles.container}>

          <Text>{questionId}</Text>

          {answers.map(answer => {
                return (
                    <View key={answer.id}>

                        <Text >{answer.answer}</Text>

                    </View>)
            })}
         
          <StatusBar style="auto" />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });