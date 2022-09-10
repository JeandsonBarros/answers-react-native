
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { getAnswersByUser } from '../../../services/AnswersService';
import Card from '../../layouts/Card';
import Svg, { Path } from 'react-native-svg';
import { getQuantyLikes } from '../../../services/LikesService';

export default function AnswersByUser({ route, navigation }) {

  const [answers, setAnswers] = useState([]);

  useEffect(() => {

    getAnswersByUser(1).then((answers) => {
      console.log(answers.answers);
      setAnswers(answers.answers)
    })

  }, [])

  return (

    <View style={styles.container}>
      <ScrollView style={{ height: '100%' }}>

        {/* <View style={StylesScreens.search}>

          <Svg style={{ margin: 5 }} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#19242E" class="bi bi-search" viewBox="0 0 16 16">
            <Path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </Svg>

          <TextInput
            placeholder='Buscar questão por enunciado'
            style={StylesScreens.textInputSearch}
            value={search}
            onChangeText={searchQuestion}
          />

        </View> */}

        {answers.map(answer => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Question", { questionId: answer.questionId })}
              key={answer.id}>

              <Card
                key={answer.id}
                id={answer.id}
                title={answer.user_name}
                content={answer.answer}
                getQuantity={getQuantyLikes}
                icon={
                  <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#0AAD7C" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <Path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                  </Svg>
                }
              />

            </TouchableOpacity>)
        })}
      </ScrollView>
    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },



});