import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { findAnswersByUser, getAnswersByUser } from '../../../services/AnswersService';
import CardAnswer from '../../layouts/CardAnswer';
import SearchInput from '../../layouts/SearchInput';
import Styles from '../../styles/Styles';


export default function AnswersByUser({ route, navigation }) {

  const [answers, setAnswers] = useState([]);
  const [visibleLoad, setVisibleLoad] = useState(true);
  const [search, setSearch] = useState("");
  const [inSearch, setInSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {

    navigation.addListener('focus', () => {
      setSearch('')
      setInSearch(false)
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
    setInSearch(true)

    if (searchParam.length > 0) {
      const data = await findAnswersByUser(pageParam, searchParam)
      setTotalPage(data.total_pages)
      setPage(data.page)

      if (pageParam == 1)
        typeof (data) == "object" ? setAnswers(data.answers) : setAnswers([])
      else
        typeof (data) == "object" ? setAnswers(answers.concat(data.answers)) : setAnswers([])

    } else {
      setAnswers([])
    }
  }

  return (

    <View style={Styles.container}>

      <SearchInput
        placeholder='Buscar resposta'
        value={search}
        onChangeText={searchAnswer}
      />

      {inSearch &&
        <TouchableOpacity
          onPress={() => {
            setInSearch(false)
            setSearch('')
            listAnswers(1)
          }}
          style={Styles.exitSearch}
        >
          <Text
            style={Styles.textExiteSearch}>
            Sair da busca
          </Text>
        </TouchableOpacity>
      }

      <ScrollView style={{ height: '100%' }}>

        {!visibleLoad && (() => {
          if (answers.length == 0)
            return (
              <Text style={{ textAlign: 'center', margin: 10 }}>
                Nem uma respostas encontrada
              </Text>)
        })()
        }

        {visibleLoad ? <ActivityIndicator style={{ marginTop: 10 }} size="large" color={'#0AAD7C'} /> : answers.map(answer => {

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

        {totalPage > page &&
          <TouchableOpacity
            onPress={pagination}
            style={Styles.buttonPagination}>
            <Text style={Styles.textButtonPagination}>
              Mostrar mais +
            </Text>
          </TouchableOpacity>}

      </ScrollView>

    </View >

  );
}
