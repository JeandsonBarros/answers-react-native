import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


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