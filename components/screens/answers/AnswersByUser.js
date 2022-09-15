
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { getAnswersByUser, findAnswersByUser } from '../../../services/AnswersService';
import CardAnswer from '../../layouts/CardAnswer';
import Navbar from '../../layouts/Navbar';
import Load from '../../layouts/Load';
import Styles from '../../styles/Styles'
import Svg, { Path } from 'react-native-svg';

export default function AnswersByUser({ route, navigation }) {

  const [answers, setAnswers] = useState([]);
  const [visibleLoad, setVisibleLoad] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {

    navigation.addListener('focus', () => {
      listAnswers(1)
    });

    listAnswers(1)

  }, [])

  async function listAnswers(pageParam) {
    try {

      const data = await getAnswersByUser(pageParam)
      setTotalPage(data.total_pages)

      if (pageParam == 1)
        typeof (data) == "object" ? setAnswers(data.answers) : setAnswers([])
      else
        typeof (data) == "object" ? setAnswers(answers.concat(data.answers)) : setAnswers([])

      setVisibleLoad(false)

    } catch (error) {
      console.log(error);
    }
  }

  async function pagination() {

    const pageTemp = page + 1

    if (pageTemp <= totalPage) {

      setPage(pageTemp)

      if (search.length > 0) {
        searchAnswer(search, pageTemp)

      } else {
        listAnswers(pageTemp)
      }

    }

  }

  async function searchAnswer(searchParam, pageParam = 1) {
    setSearch(searchParam)

    if (searchParam.length > 0) {
      const data = await findAnswersByUser(pageParam, searchParam)
      setTotalPage(data.total_pages)

      if (pageParam == 1)
        typeof (data) == "object" ? setAnswers(data.answers) : setAnswers([])
      else
        typeof (data) == "object" ? setAnswers(answers.concat(data.answers)) : setAnswers([])

    } else {

      setPage(1)
      listAnswers(1)
    }
  }


  return (

    <View style={styles.container}>

      <View style={Styles.search}>

        <Svg style={{ margin: 5 }} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#19242E" class="bi bi-search" viewBox="0 0 16 16">
          <Path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </Svg>

        <TextInput
          placeholder='Buscar resposta'
          style={Styles.textInputSearch}
          value={search}
          onChangeText={searchAnswer}
        />

      </View>

      <ScrollView style={{ height: '100%' }}>

        {!visibleLoad && (() => {
          if (answers.length == 0)
            return (
              <Text style={{ textAlign: 'center' }}>
                Nem uma respostas encontrada
              </Text>)
        })()
        }

        {visibleLoad ? <Load /> : answers.map(answer => {

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

        {!(page == totalPage ) || answers.length == 0  && <TouchableOpacity
          onPress={pagination}
          style={{
            backgroundColor: '#0AAD7C',
            borderRadius: 10,
            margin: 15,
            padding: 10
          }}
        >
          <Text style={{
            color: '#fff',
            fontSize: 20,
            textAlign: 'center',
          }}> Mostrar mais + </Text>

        </TouchableOpacity>}

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