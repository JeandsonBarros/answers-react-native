import { getToken } from "./TokenService"

export async function getAllQuestions(page) {

    const response = await fetch(`https://api-suas-questoes.herokuapp.com/questions?page=${page}`)
    const data = await response.json()

    return data

}

export async function getQuestionsByUser(page) {

    let token = await getToken()

    token = JSON.parse(token)

    let fetchData = {
        method: 'GET',
        headers: {
            'authorization': "Bearer " + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

    }

    const response = await fetch(`https://api-suas-questoes.herokuapp.com/questions/by/user?page=${page}`, fetchData)
    const data = await response.json()

    return typeof (data) == 'string' ? [] : data

}

export async function findQuestion(statement, page) {
    try {
        const response = await fetch(`https://api-suas-questoes.herokuapp.com/questions/find?statement=${statement}&page=${page}`)
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error);
    }
}

export async function findQuestionByUser(statement, page) {

    let token = await getToken()
    token = await JSON.parse(token)

    let fetchData = {
        method: 'GET',
        headers: {
            'authorization': "Bearer " + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    const response = await fetch(`https://api-suas-questoes.herokuapp.com/questions/by/user?search=${statement}&page=${page}`, fetchData)
    const data = await response.json()

    return data
}

export async function getQuestion(questionId) {

    const response = await fetch(`https://api-suas-questoes.herokuapp.com/questions/${questionId}`)
    const data = await response.json()

    return data

}

export async function postQuestion(question) {

    try {


        let token = await getToken()
        token = await JSON.parse(token)

        let fetchData = {
            method: 'POST',
            headers: {
                'authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(question)

        }

        const response = await fetch(`https://api-suas-questoes.herokuapp.com/questions`, fetchData)
        const data = await response.json()

        return data.message


    } catch (error) {
        console.log(error);
    }

}

export async function putQuestion(question, id) {

    try {

        let token = await getToken()
        token = await JSON.parse(token)

        let fetchData = {
            method: 'PUT',
            headers: {
                'authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answer: question.answer,
                matter: question.matter,
                statement: question.statement
            })
        }

        const response = await fetch(`https://api-suas-questoes.herokuapp.com/questions/${id}`, fetchData)
        const data = await response.json()

        return data.message

    } catch (error) {
        console.log(error);
    }

}

export async function deleteQuestion(id) {
    try {

        let token = await getToken()
        token = await JSON.parse(token)

        let fetchData = {
            method: 'DELETE',
            headers: {
                'authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(`https://api-suas-questoes.herokuapp.com/questions/${id}`, fetchData)
        const data = await response.json()

        return data.message

    } catch (error) {
        console.log(error);
    }
}