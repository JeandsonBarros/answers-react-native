
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { getAnswersByUser } from '../../../services/AnswersService';
import CardAnswer from '../../layouts/CardAnswer';
import Navbar from '../../layouts/Navbar';

export default function AnswersByUser({ route, navigation }) {

  const [answers, setAnswers] = useState([]);

  useEffect(() => {

        getAnswersByUser(1).then((data) => {
          typeof (data) == "object" ? setAnswers(data.answers) : setAnswers([])
        })
     
  }, [])

  return (

    <View style={styles.container}>
      <ScrollView style={{ height: '100%' }}>

        {answers.length == 0 ?
          <Text>
            Você ainda não tem respostas
          </Text>
          :
          <Text>
            -
          </Text>
        }

        {answers.map(answer => {

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Question", { questionId: answer.questionId })}
              key={answer.id}>

              <CardAnswer
                key={answer.id}
                id={answer.id}
                title={answer.user_name}
                content={answer.answer}
                date={answer.createdAt}
              />

            </TouchableOpacity>)
        })}


      </ScrollView>

      <Navbar
        navigation={navigation}
        route={route}
      />

    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },



});